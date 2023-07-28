# schema.py
from drf_spectacular.utils import extend_schema, OpenApiParameter
from drf_spectacular.types import OpenApiTypes
from .serializer import ServerSerializer, ChannelSerializer

server_list_docs = extend_schema(
    responses=ServerSerializer(many=True),
    parameters=[
        OpenApiParameter(
            name="category",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="The category name to filter the servers by. If this parameter is provided, only servers belonging to this category are returned.",
        ),
        OpenApiParameter(
            name="num_results",
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description="The maximum number of server results to return. If this parameter is provided, the response will include up to this number of servers.",
        ),
        OpenApiParameter(
            name="by_user",
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="If this parameter is set to 'true', the servers returned will be those that the authenticated user is a member of. This parameter only works if a user is authenticated.",
        ),
        OpenApiParameter(
            name="by_serverid",
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description="The ID of a specific server to return. If this parameter is provided, only the server with this ID will be returned, if it exists.",
        ),
        OpenApiParameter(
            name="with_num_members",
            type=OpenApiTypes.BOOL,
            location=OpenApiParameter.QUERY,
            description="If this parameter is set to 'true', each server object in the response will include a count of its members.",
        ),
    ],
)
