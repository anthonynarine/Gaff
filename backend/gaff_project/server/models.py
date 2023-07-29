import imp
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from django.dispatch import receiver

from .utils import scale_down_image
from .validators import validate_icon_image_size, validate_image_file_extension


def category_icon_upload_path(instance, filename):
    """
    Determines the upload path for category icons.

    This function is used in the `upload_to` option of a `FileField` in Django.
    When a file is uploaded to the `icon` field of a `Category` instance, Django
    calls this function to determine where to store the file.

    Args:
        instance (Category): The instance of the `Category` model that the file is being uploaded to.
        filename (str): The original name of the file that was uploaded.

    Returns:
        str: The upload path for the file. This is a string that specifies where Django will store the file.

    Example:
        Assuming the category's ID is 1 and the uploaded file is named `my_file.png`, this function
        will return the string "category/1/category_icon/my_file.png". Django will then store the file
        at that location.
    """
    # The f-string `f"category/{instance.id}/category_icon/{filename}"` constructs the upload path.
    # The `{instance.id}` part is replaced with the ID of the category, and the `{filename}` part
    # is replaced with the original name of the file. The resulting string is a path like
    # "category/1/category_icon/my_file.png".
    return f"category/{instance.id}/category_icon/{filename}"


def channel_icon_upload_path(instance, filename):
    """
    Determines the upload path for channel icons.

    Args:
        instance (Channel): The instance of the `Channel` model that the file is being uploaded to.
        filename (str): The original name of the file that was uploaded.

    Returns:
        str: The upload path for the file.
    """
    return f"channel/{instance.id}/channel_icons/{filename}"


def channel_banner_img_upload_path(instance, filename):
    """
    Determines the upload path for channel banners.

    Args:
        instance (Channel): The instance of the `Channel` model that the file is being uploaded to.
        filename (str): The original name of the file that was uploaded.

    Returns:
        str: The upload path for the file.
    """
    return f"channel/{instance.id}/channel_banners/{filename}"


class Category(models.Model):
    """
    Category that can be assigned to servers in the system.
    """

    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(
        upload_to=category_icon_upload_path,
        null=True,
        blank=True,
        validators=[validate_icon_image_size, validate_image_file_extension],
    )

    def save(self, *args, **kwargs):
        """
        Overwrites the default save method to handle deletion of the old icon
        and banner when new ones are uploaded.

        First, the function checks if the instance already has an ID. The presence of an ID indicates
        that this is an existing Channel in the database, not a new instance being created.
        This check is crucial because we only want to attempt deletion of the previous icon and banner for
        an existing Channel that is being updated.

        If the Channel is already in the database, the function fetches the current Channel
        instance from the database using Django's get_object_or_404 function. This function will
        return the Channel object if it exists, and if it doesn't, it will raise a Http404 exception.

        The function then compares the existing icon and banner with the new ones. If they differ, it means a
        new icon or banner has been uploaded. When a new icon or banner is uploaded, the function deletes the old
        icon or banner file from the filesystem. It's important to note that the `delete` method of a
        FileField takes an optional `save` argument. By default, `save` is `True`, and it will save
        the model after deleting the associated file. In this case, however, we pass `save=False`
        to the `delete` method to avoid an unnecessary additional database write, as we are about
        to save the model ourselves in the next step.

        Finally, the original save method is called through the use of `super()` to save the
        changes (including the new icon and banner) to the database.

        Args:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments."""
        if self.id:
            existing = get_object_or_404(Category, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)

        if self.icon:
            scale_down_image(self.icon.path)

        super(Category, self).save(*args, **kwargs)


@receiver(models.signals.pre_delete, sender="server.Category")
def category_delete_files(sender, instance, **kwargs):
    """
    Receiver for a `pre_delete` signal on the `Category` model.

    This function is triggered right before a `Category` instance is deleted. Its main role is to
    delete the associated icon file from the file system, if one exists.

    The function checks if the `Category` instance has an associated icon by trying to access
    the `icon` attribute. If the `icon` attribute has a value (i.e., a file), it calls the `delete`
    method on it, which deletes the file from the file system.

    The `delete` method takes an optional `save` argument which defaults to `True`. However, since
    we are in the process of deleting the `Category` instance from the database, there is no need
    to save it. Hence, we pass `save=False` to avoid an unnecessary database operation.

    Args:
        sender (Model): The model class that sent the signal.
        instance (Model instance): The actual instance being deleted.
        **kwargs: Arbitrary keyword arguments.
    """
    if instance.icon:
        instance.icon.delete(save=False)

    def __str__(self):
        return self.name


class Server(models.Model):
    """
    Server in the system that belongs to a specific category.
    """

    name = models.CharField(max_length=50)
    # Server can have only one owner
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="server_owner"
    )
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="server_category"
    )
    description = models.CharField(max_length=250, blank=True, null=True)
    members = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):

        return f"{self.name} (ID: {self.id})"


class Channel(models.Model):
    """
    Channel within a server in the system.
    """

    name = models.CharField(max_length=50)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="channel_owner"
    )
    topic = models.CharField(max_length=100)
    server = models.ForeignKey(
        Server, on_delete=models.CASCADE, related_name="channel_server"
    )
    banner_img = models.ImageField(
        upload_to=channel_banner_img_upload_path,
        blank=True,
        null=True,
        validators=[validate_image_file_extension],
    )
    icon = models.ImageField(
        upload_to=channel_icon_upload_path,
        blank=True,
        null=True,
        validators=[validate_icon_image_size, validate_image_file_extension],
    )

    def save(self, *args, **kwargs):
        """
        Overwrites the default save method to handle deletion of the old icon
        when a new one is uploaded.

        First, the function checks if the instance already has an ID. The presence of an ID indicates
        that this is an existing Category in the database, not a new instance being created.
        This check is crucial because we only want to attempt deletion of the previous icon for
        an existing Category that is being updated.

        If the Category is already in the database, the function fetches the current Category
        instance from the database using Django's get_object_or_404 function. This function will
        return the Category object if it exists, and if it doesn't, it will raise a Http404 exception.

        The function then compares the existing icon with the new icon. If they differ, it means a
        new icon has been uploaded. When a new icon is uploaded, the function deletes the old
        icon file from the filesystem. It's important to note that the `delete` method of a
        FileField takes an optional `save` argument. By default, `save` is `True`, and it will save
        the model after deleting the associated file. In this case, however, we pass `save=False`
        to the `delete` method to avoid an unnecessary additional database write, as we are about
        to save the model ourselves in the next step.

        Finally, the original save method is called through the use of `super()` to save the
        changes (including the new icon) to the database.

        Args:
            *args: Variable length argument list.
            **kwargs: Arbitrary keyword arguments.
        """

        if self.id:
            existing = get_object_or_404(Channel, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)
            if existing.banner_img != self.banner_img:
                existing.banner_img.delete(save=False)
                
        if self.icon:
            scale_down_image(self.icon.path)
        if self.banner_img:
            scale_down_image(self.banner_img.path)

        super(Channel, self).save(*args, **kwargs)


@receiver(models.signals.pre_delete, sender="server.Server")
def delete_files(sender, instance, **kwargs):
    """
    This receiver function is triggered right before a `Server` instance is deleted.
    It deletes any associated files for specified fields from the file system.

    We use a Python set to store the field names that we want to check. A set is a built-in Python
    data structure that can store multiple items in a single variable. We use a set here for two main
    reasons:

    1. **Readability and maintainability**: If we need to check more field names in the future,
    we can simply add them to the set, rather than extending a potentially long line of `or` conditions.
    2. **Efficiency**: Checking membership in a set is generally faster than checking membership in a list
    or a tuple, especially for large collections. This won't make a noticeable difference in this case,
    but it's a good practice to follow when dealing with larger sets of data.

    For each field in the instance's fields, the function checks if the field's name is in the set
    of names. If it is, the function tries to get the value of that field (i.e., the associated file)
    using the `getattr` function. If the field has a value, the function deletes the file from the
    file system by calling the `delete` method on the field's value.

    The `delete` method of a `FileField` (or an `ImageField`) in Django deletes the file from the file
    system. The method takes an optional `save` argument, which defaults to `True`. This argument
    determines whether to save the model after deleting the associated file. However, since the instance
    is about to be deleted from the database, there's no need to save it. Therefore, we pass `save=False`
    to avoid an unnecessary database operation.

    Args:
        sender (Model): The model class that sent the signal.
        instance (Model instance): The actual instance being deleted.
        **kwargs: Arbitrary keyword arguments.
    """
    field_names_to_check = {"icon", "banner"}
    for field in instance._meta.fields:
        if field.name in field_names_to_check:
            file = getattr(instance, field.name)
            if file:
                file.delete(save=False)

    def __str__(self):
        return self.name
    
    
    
    
    
                         #   SUMMARY
"""Upload Path Functions: category_icon_upload_path, channel_icon_upload_path,
and channel_banner_img_upload_path are responsible for defining the upload
paths for each file related to a category or channel.

Category Class: Defines the Category model with fields for the name, description,
and icon. You're also overwriting the default save method to handle the deletion
of the old icon when a new one is uploaded, and scaling down the image size if 
there's a new icon. You have also defined a receiver for pre_delete signal to
delete the icon file from the filesystem when the Category instance is deleted.

Server Class: Defines the Server model with fields for the name, owner, category,
description, and members.

Channel Class: Defines the Channel model with fields for the name, owner,
topic, server, banner image, and icon. Similar to the Category model, you're 
overwriting the default save method to handle the deletion of the old icon and
banner image when new ones are uploaded, and scaling down the image size if
there's a new icon or banner image.

pre_delete signal receiver for Server: You have a receiver function that gets
triggered before a Server instance is deleted. It loops over specific fields
(in this case, "icon" and "banner") and deletes the associated files from the
filesystem.

You've done a great job with your Django models, ensuring that file paths
are properly handled and unnecessary files are deleted when they are replaced
or their associated model instance is deleted. This is good practice to avoid 
accumulation of unused files in your storage.

One potential improvement you could make would be to add docstrings for the 
Server and Channel classes, similar to what you have done for the Category
class. This can help others understand what these models represent and how 
they are structured.

Also, for the pre_delete signal receiver for the Server model, you've used
the sender as "server.Server". While this should work, it might be better to 
use the actual Server model class as the sender for consistency and to ensure
that the receiver function gets correctly hooked to the Server model's pre_delete
signal.

Finally, make sure you have defined the scale_down_image function in your
.utils module, as it is called in your overridden save methods but not defined

within this code. And remember to import and configure the models in your 
Django admin site if you want to manage them via the Django admin interface.
"""




