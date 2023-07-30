from rest_framework import serializers
from .models import Category, Server, Channel
from typing import Dict, Any

class ChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Channel
        fields = "__all__"


class ServerSerializer(serializers.ModelSerializer):
    """
    Excludes the 'member' field. Also includes the 'num_members' field which is 
    a count of the number of members on the server. This field is added in a view 
    and is optional, so it is only included in the serialized data if it is not None.

    In addition, it includes related Channel objects.
    """
    num_members = serializers.SerializerMethodField()
    channel_server = ChannelSerializer(many=True)
    
    class Meta:
        model = Server
        exclude = ("members",)
        
    def get_num_members(self, obj) -> int:
        """
        This method is used to get the value of the 'num_members' field, if it is present.
        'num_members' is not a model field but is added in a view using annotate().
        """
        if hasattr(obj, "num_members"):
            return obj.num_members
        else:
            return None
    
    def to_representation(self, instance) -> Dict[str, Any]:
        """
        Overriding the default to_representation method to conditionally include 'num_members'.
        """
        data = super().to_representation(instance)
        # If 'num_members' is None, remove it from the serialized data
        if data.get('num_members') is None:
            data.pop('num_members')
        return data