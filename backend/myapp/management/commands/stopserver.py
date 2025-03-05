"""
creating stopserver command to manually stop the django backend server used to delete /media/ directory and clean the database 
"""

from django.core.management.base import BaseCommand

from myapp.del_generated_img import del_img


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            del_img()
        except Exception as e:
            self.stderr.write(f"error : {e}")
