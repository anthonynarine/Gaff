from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Conversation, Message
from django.contrib.auth import get_user_model

User = get_user_model()

class WebChatConsumer(JsonWebsocketConsumer):
    """
    WebSocket consumer facilitating real-time chat using Django Channels. 

    On connecting, the frontend establishes a WebSocket connection to a specific chat room.
    Messages from the frontend are received in real-time, saved to the database, 
    and then broadcasted to all clients in the chat room.

    Methods:
    - connect: Sets up the WebSocket connection and joins the specified chat room.
    - receive_json: Handles incoming messages, saves them, and broadcasts to all clients in the room.
    """

    def __init__(self, *args, **kwargs):
        """
        Constructs the consumer, initializing the chat room ID and user attributes.
        """
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        """
        Set up the WebSocket connection. The channel ID is derived from the route.
        The user is then associated (currently hardcoded) and the connection is added to the chat group.
        """
        self.accept()
        self._extract_channel_id_from_route()
        self._associate_user()
        self._join_chat_group()

    def receive_json(self, content):
        """
        Processes incoming messages from the frontend.
        
        The received content is expected in the format:
        {
            "message": "text of the chat message"
        }

        On processing, the message is saved to the database and broadcasted in the format:
        {
            "type": "chat.message",
            "id": "<message ID>",
            "sender": "<message content>",
            "timestamp": "<timestamp>",
            "new_message": "<text of the chat message>"
        }
        """
        message_text = content.get("message")
        if not message_text:
            return  # Handle cases where the message content might be missing or null
        
        new_message = self._save_received_message(message_text)
        self._broadcast_message_to_group(new_message)

    def _extract_channel_id_from_route(self):
        """Retrieve channel ID from the URL route."""
        self.channel_id = self.scope["url_route"]["kwargs"].get("channelId")

    def _associate_user(self):
        """Associate the connection with a user (currently hardcoded)."""
        self.user = User.objects.get(id=1)  # Placeholder logic

    def _join_chat_group(self):
        """Add the current connection to the chat group."""
        async_to_sync(self.channel_layer.group_add)(self.channel_id, self.channel_name)

    def _save_received_message(self, message_text):
        """Save the received message in the database."""
        conversation, _ = Conversation.objects.get_or_create(channel_id=self.channel_id)
        return Message.objects.create(
            conversation=conversation, sender=self.user, content=message_text
        )

    def _broadcast_message_to_group(self, message):
        """Send the message to all members of the chat group."""
        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat.message",
                "id": message.id,
                "sender": message.content,
                "timestamp": message.timestamp.isoformat(),
                "new_message": message.content,
            },
        )
        
    def chat_message(self, message):
        """
        Sends a chat message to the client/front end.

        Args:
            message (dict): The message to be sent to the client.

        This method is responsible for forwarding chat messages to the client after
        they have been received and processed.
        """
        self.send_json(message)

    def disconnect(self, close_code):
        """
        Handles the WebSocket disconnect event.
        
        On disconnecting:
        1. Removes the connection from the associated chat group.
        2. Calls the parent class's disconnect method to handle any additional disconnection logic.

        Args:
            close_code (int): The code signifying the reason for the disconnection.
        """
        # Remove this connection from the chat group
        async_to_sync(self.channel_layer.group_discard)(self.channel_id, self.channel_name)
        
        # Handle additional disconnection logic from the parent class
        super().disconnect(close_code)



                #   CONSUMER SUMMARY
"""The WebChatConsumer is a WebSocket consumer designed for real-time
chat using Django Channels. It's constructed to receive, save, 
and broadcast chat messages in real time:

Initialization (__init__): When instantiated, the consumer initializes
two attributes: channel_id and user to None.

Connection (connect): On a WebSocket connection request:

The connection is accepted.
The channel_id is extracted from the URL route.
A user (currently hardcoded) is associated with the connection.
The connection joins a chat group associated with the channel_id.
Receiving Messages (receive_json): When a message is received from 
the frontend:

The message's text is extracted.
If the text is valid, the message is saved to the database.
The saved message is then broadcasted to all clients in the 
associated chat room.

Broadcasting (_broadcast_message_to_group): A utility method
is used to send the saved message to all members of the chat group.

Disconnection (disconnect): It provides a placeholder to handle
any logic that might be needed when the WebSocket connection is terminated.

This consumer provides a basic implementation for real-time chat
functionality, and its methods have been refactored for better 
readability and maintainability."""
