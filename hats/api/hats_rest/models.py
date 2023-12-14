
from django.db import models


class LocationVO(models.Model):
    shelf_number = models.PositiveSmallIntegerField(null=True)
    closet_name = models.CharField(max_length=100, null=True)
    import_href = models.CharField(max_length=500, null=True, unique=True)


class Hat(models.Model):
    fabric = models.CharField(max_length=100)
    style_name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    hat_picture_url = models.URLField(null=True, max_length=500)
    
    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
        null=True
    )