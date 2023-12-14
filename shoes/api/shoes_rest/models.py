from django.core.exceptions import ObjectDoesNotExist
from django.db import models

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    import_href = models.CharField(max_length=200, unique=True)
    bin_number = models.PositiveSmallIntegerField(null=True)

class Shoes(models.Model):
    model_name = models.CharField(max_length=200)
    manufacturer = models.CharField(max_length=200)
    color = models.CharField(max_length=200)
    picture_url = models.URLField(null=True, max_length=500)

    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE
    )
