from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

class WebChatConsumer(JsonWebsocketConsumer):
    """
    WebSocket consumer that handles real-time chat messages for a web chat service.
    
    Example:
        - A user sends a message from the frontend.
        - `receive_json` processes the message.
        - It then broadcasts the message to all clients through `chat_message`.
    """

    def __init__(self, *args, **kwargs):
        """
        Initialize the consumer, setting up the default chat room.
        """
        super().__init__(*args, **kwargs)
        self.room_name = "testserver"

    def connect(self):
        """
        Connects the WebSocket, adding the socket to the chat room group.
        
        Example:
            When a client opens the chat page, this method connects them to the chat room.
        """
        self.accept()
        async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)

    def receive_json(self, content):
        """
        Handles incoming JSON content (messages) from the client/front end.

        Args:
        - content (dict): The message received from the client/front end.
        
        Example:
            If the frontend sends:
                {"message": "Hello World"}
            This will broadcast:
                {"type": "chat.message", "new_message": "Hello World"}
        """
        async_to_sync(self.channel_layer.group_send)(
            self.room_name,
            {
                "type": "chat.message", 
                "new_message": content["message"]
            },
        )

    def chat_message(self, message):
        """
        Sends a chat message to the client/front end.

        Args:
        - message (dict): The message to be sent to the client.
        
        Example:
            Given the message:
                {"type": "chat.message", "new_message": "Hello World"}
            All clients in the chat room will receive:
                {"new_message": "Hello World"}
        """
        self.send_json(message)

    def disconnect(self, close_code):
        """
        Handles the WebSocket disconnect event.

        Args:
        - close_code (int): The code signifying the reason for the disconnection.
        """
        pass
 