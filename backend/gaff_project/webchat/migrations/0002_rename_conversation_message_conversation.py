# Generated by Django 4.2.3 on 2023-08-21 16:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("webchat", "0001_initial"),
    ]

    operations = [
        migrations.RenameField(
            model_name="message",
            old_name="Conversation",
            new_name="conversation",
        ),
    ]
