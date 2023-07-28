
from rest_framework import serializers
from .models import Category, Server, Channel

class ChannelSerializer(serializers.ModelSerializer):
    # Server data will also incude all categories on that server
    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    channel_server = ChannelSerializer(many=True)
    # Server data will also include all Categories on that Sever by refrence of the fk.
    
    
    class Meta:
        model = Server
        fields = "__all__"