# Generated by Django 4.0.3 on 2023-12-14 02:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0006_binvo_bin_number'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='binvo',
            name='bin_number',
        ),
    ]
