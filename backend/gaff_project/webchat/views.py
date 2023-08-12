from rest_framework import viewsets
from .models import Message, Conversation
from rest_framework.response import Response
from .serializers import MessageSerializer
from .schemas import list_message_docs

@list_message_docs
class MessageViewSet(viewsets.ViewSet):
    
    def list(self, request):
        channel_id = request.query_params.get("channel_id")
        
        if not channel_id:
            return Response({"detail": "channel_id query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            conversation = Conversation.objects.get(channel_id=channel_id)
        except Conversation.DoesNotExist:
            return Response({"detail": "No conversation found for provided channel_id."}, status=status.HTTP_404_NOT_FOUND)
        
        messages = conversation.message.all()
        serializer = MessageSerializer(messages, many=True)
        
        return Response(serializer.data)


    