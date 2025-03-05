from django.contrib import admin

from .models import RoomInterior


# Register your models here.
class RoomAdmin(admin.ModelAdmin):
    list_display = ["id", "room_type", "room_image_url"]
    list_display_links = ["room_type"]
    list_filter = ["room_type"]
    search_fields = ["room_type"]


admin.site.register(RoomInterior, RoomAdmin)
