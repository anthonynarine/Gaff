from rest_framework import viewsets, status
from rest_framework.decorators import api_view, schema
from .models import Message, Conversation
from rest_framework.response import Response
from .serializers import MessageSerializer
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


class MessageViewSet(viewsets.ViewSet):
    """
    A ViewSet for viewing and manipulating the Message instances.
    
    list:
    Retrieve a list of messages associated with a specific channel_id.
    """   
    @swagger_auto_schema(
        # Specify the query parameters this API can expect in the request.
        manual_parameters=[
            openapi.Parameter('channel_id', in_=openapi.IN_QUERY, description='ID of the channel for which messages are to be fetched.', type=openapi.TYPE_STRING, required=True)
        ],
        # Define the possible responses this API can return.
        responses={
            200: MessageSerializer(many=True),
            400: 'Bad request response when channel_id is not provided.',
            404: 'Response when no conversation is found for the provided channel_id.'
        },
        operation_description="Retrieve messages associated with a given channel_id."
    )
    def list(self, request):
        """
        Fetches the list of messages for a provided channel_id.

        The channel_id is required as a query parameter. If the channel_id is not provided or if there's no conversation
        associated with the provided channel_id, appropriate error responses are returned.
        """
        # Fetch channel_id from query parameters.
        channel_id = request.query_params.get("channel_id")
        
        # Return an error response if channel_id is not provided.
        if not channel_id:
            return Response({"detail": "channel_id query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Try fetching the conversation for the provided channel_id.
        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
        except Conversation.DoesNotExist:
            return Response([])
        
        # Fetch all messages associated with the fetched conversation.
        messages = conversation.message.all()
        serializer = MessageSerializer(messages, many=True)
        
        # Return the serialized list of messages.
        return Response(serializer.data)


    