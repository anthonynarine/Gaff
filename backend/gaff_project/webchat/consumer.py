from channels.generic.websocket import WebsocketConsumer

class MyConsumer(WebsocketConsumer):
    """
    A simple WebSocket consumer that handles connections, receives text messages, 
    and sends a response back to the client.
    """

    def connect(self):
        """
        Handle new WebSocket connections.
        """
        # Accept the incoming connection
        self.accept()
        # Note: To reject the connection, you can uncomment the following line:
        # self.close()

    def receive(self, text_data=None, bytes_data=None):
        """
        Receive messages from WebSocket.

        :param text_data: The text data received from the client.
        :param bytes_data: The bytes data received from the client. 
                           This is expected to be None for this consumer as we are only dealing with text.
        """
        # Since we're only expecting text data, we'll only handle text_data
        # If there's any text data, send a 'Hello world!' message back to the client
        if text_data:
            self.send(text_data=text_data)
        # Note: To force-close the connection, you can uncomment the following line:
        # self.close()

    def disconnect(self, close_code):
        """
        Handle the closing of the WebSocket connection.

        :param close_code: An integer code indicating the reason for disconnection.
        """
        # Here you can add any cleanup or actions needed during disconnection.
        pass
