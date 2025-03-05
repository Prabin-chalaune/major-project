from rest_framework import serializers

from .models import RoomInterior


class InterriorSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomInterior
        fields = [
            "room_type",
            "room_image_url",
        ]
