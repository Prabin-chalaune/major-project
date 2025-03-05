"""
This file will delete all the images from the /media/generated_images/ directory and also from the database.
The deletion will be done when the backend server is closed
"""

import os
import shutil

from django.conf import settings
from django.core.management import call_command

from .models import RoomInterior


def del_img():

    try:
        """
        Sometimes RoomInterior needs to be imported here instead of importing at top cause error occurs as
        django.core.exceptions.AppRegistryNotReady: Apps aren't loaded yet.
        """

        interiors = RoomInterior.objects.all()

        # delete local storage /media/
        img_path = settings.MEDIA_ROOT
        if os.path.exists(img_path):
            shutil.rmtree(img_path)
            os.makedirs(img_path)

        # delete from database
        RoomInterior.objects.all().delete()
        """
        This will only delete the content of the database but id is not reseted.
        so, need to use flush method to completely reset database
        # call_command("flush", "--no-input")
        """

    except Exception as e:
        print(f"error: {str(e)}")
