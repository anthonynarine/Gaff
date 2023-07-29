from PIL import Image
import os

def scale_down_image(image_path, max_size=(70, 70)):
    """
    Scales down an image to a maximum size while maintaining aspect ratio.

    This function opens an image from a given path and scales it down such that its largest dimension
    is no greater than provided in the max_size tuple. If the image is already smaller than max_size,
    then the image will not be resized. The scaled-down image is saved back to the same path, replacing
    the original image.

    If the image_path is None or not a valid path to an image file, the function will immediately return
    and no action will be performed.

    Args:
        image_path (str): The file path to the image to be scaled down.
        max_size (tuple): A tuple containing two integers, the maximum width and height for the scaled-down image.

    Returns:
        None
    """

    # Check if the image path is None or does not exist
    # If either is true, return immediately
    if image_path is None or not os.path.isfile(image_path):
        return

    # Open the image file at the provided path
    with Image.open(image_path) as img:
        # Resize the image while maintaining its aspect ratio,
        # such that it fits within the specified maximum dimensions
        img.thumbnail(max_size)

        # Save the resized image back to the original path, replacing the original image
        img.save(image_path)
