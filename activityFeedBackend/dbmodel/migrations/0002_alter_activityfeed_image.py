# Generated by Django 4.1.1 on 2022-09-28 17:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("dbmodel", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="activityfeed",
            name="image",
            field=models.ImageField(blank=True, upload_to="images"),
        ),
    ]
