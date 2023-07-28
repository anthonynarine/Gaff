import imp
from django.db import models
from django.conf import settings
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from django.dispatch import receiver


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


def server_icon_upload_path(instance, filename):
    return f"server/{instance.id}/server_icons/{filename}"


def server_banner_upload_path(instance, filename):
    return f"server/{instance.id}/server_banner/{filename}"


class Category(models.Model):
    """
    Category that can be assigned to servers in the system.
    """

    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    icon = models.FileField(upload_to=category_icon_upload_path, null=True, blank=True)

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
            existing = get_object_or_404(Category, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)

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
    member = models.ManyToManyField(settings.AUTH_USER_MODEL)

    def __str__(self):
        return f"{self.name}-{self.id}"


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
    banner = models.ImageField(
        upload_to=server_banner_upload_path, blank=True, null=True
    )
    icon = models.ImageField(upload_to=server_icon_upload_path, blank=True, null=True)

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
            existing = get_object_or_404(Category, id=self.id)
            if existing.icon != self.icon:
                existing.icon.delete(save=False)
            

        super(Category, self).save(*args, **kwargs)


@receiver(models.signals.pre_delete, sender="server.Server")
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
