from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

class WebChatConsumer(JsonWebsocketConsumer):
    """
    WebSocket consumer that manages real-time chat interactions over WebSocket connections.
    This consumer handles the lifecycle of WebSocket connections including connection,
    message reception, message sending, and disconnection. The underlying WebSocket handshake
    and protocol specifics are abstracted by the Django Channels library.
    """

    def __init__(self, *args, **kwargs):
        """
        Initialize the consumer and set up the default chat room.
        
        Attributes:
            room_name (str): The name of the chat room this consumer instance is associated with.
        """
        super().__init__(*args, **kwargs)
        self.channel_id = None
        self.user = None

    def connect(self):
        """
        Called immediately after a successful WebSocket handshake. 
        
        This method:
        1. Accepts the WebSocket connection.
        2. Adds the socket to the chat room group for message broadcasting.
        
        The actual handshake mechanics are handled internally by Django Channels.
        """
        self.accept()
        self.channel_id = self.scope["url_route"]["kwargs"]["channelId"]
        print(self.scope)
        async_to_sync(self.channel_layer.group_add)(self.channel_id, self.channel_name)

    def receive_json(self, content):
        """
        Handles incoming JSON content (messages) from the client/front end.

        Args:
            content (dict): The message received from the client/front end.
        
        This method processes the incoming message and broadcasts it to all clients
        in the associated chat room. The message format is transformed slightly during this process.
        """
        async_to_sync(self.channel_layer.group_send)(
            self.channel_id,
            {
                "type": "chat.message", 
                "new_message": content["message"]
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

        Args:
            close_code (int): The code signifying the reason for the disconnection.
            
        This method is called when a WebSocket connection is terminated. Cleanup or
        additional disconnect logic can be added here if needed.
        """
        pass

 