from django.db import models


# def upload_to(instance, filename):
#     return 'images/{filename}'.format(filename=filename)
# Create your models here.


class ActivityFeed(models.Model):
    id = models.BigAutoField(primary_key=True)
    textContent = models.CharField(max_length=500)
    image = models.ImageField(upload_to="images", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
