from email.errors import MessageParseError
from django.contrib import admin


from .models import Conversation, Message

admin.site.register([Conversation, Message])
