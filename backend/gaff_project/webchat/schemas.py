from drf_spectacular.utils import OpenApiParameter, extend_schema
from drf_spectacular.types import OpenApiTypes
from .serializers import MessageSerializer

list_message_docs = extend_schema(
    responses={200: MessageSerializer(many=True)},
    parameters=[
        OpenApiParameter(
            name="channel_id",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="ID of the channel",
            required=True,
        )
    ],
)