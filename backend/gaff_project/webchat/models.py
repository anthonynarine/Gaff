from enum import auto
from django.db import models
from django.contrib.auth import get_user_model


class Conversation(models.Model):
    """
    A chat channel between users.
    
    Attributes:
    - channel_id: Distinct identifier for each conversation.
    - created_at: Date and time marking the start of the conversation.
    """
    channel_id = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)


class Message(models.Model):
    """
    An individual message within a Conversation.
    
    Attributes:
    - conversation: The chat channel this message belongs to.
    - sender: The user responsible for this message.
    - content: The actual text of the message.
    - timestamp: Date and time marking when the message was dispatched.
    """
    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE, related_name="messages")
    sender = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
