from django.db import models


class RoomInterior(models.Model):
    room_type = models.CharField(max_length=20)
    room_image_url = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.room_type
