# Generated by Django 4.0.3 on 2023-12-13 22:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0002_remove_locationvo_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='locationvo',
            name='closet_name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
