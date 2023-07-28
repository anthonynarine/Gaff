from django.shortcuts import render
from .models import Server
from rest_framework import viewsets
from .serializer import ServerSerializer
from rest_framework.response import Response


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request):
        category = request.query_params.get("category")
        num_results = request.query_params.get("num_results")
        by_user = request.query_params.get("by_user") == "true"

        if category:
            self.queryset = self.queryset.filter(category__name=category)
        
        if num_results:
            self.queryset = self.queryset[: int(num_results)]  
            
        if by_user:
            user_id = request.user.id
            self.queryset = self.queryset.filter(member=user_id)  
            
        serializer = ServerSerializer(self.queryset, many=True)
        return Response(serializer.data)
