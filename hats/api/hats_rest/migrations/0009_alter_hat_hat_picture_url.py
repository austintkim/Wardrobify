# Generated by Django 4.0.3 on 2023-12-14 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0008_alter_locationvo_import_href'),
    ]

    operations = [
        migrations.AlterField(
            model_name='hat',
            name='hat_picture_url',
            field=models.URLField(max_length=500, null=True),
        ),
    ]
