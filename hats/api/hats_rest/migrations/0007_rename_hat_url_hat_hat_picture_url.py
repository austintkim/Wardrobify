# Generated by Django 4.0.3 on 2023-12-13 23:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hats_rest', '0006_alter_locationvo_shelf_number'),
    ]

    operations = [
        migrations.RenameField(
            model_name='hat',
            old_name='hat_url',
            new_name='hat_picture_url',
        ),
    ]
