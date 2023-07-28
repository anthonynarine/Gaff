from django.shortcuts import render
from .models import Server
from rest_framework import viewsets
from .serializer import ServerSerializer
from rest_framework.response import Response


class ServerListViewSet(viewsets.ViewSet):
    queryset = Server.objects.all()

    def list(self, request):
        category = request.query_params.get("category")

        if category:
            self.queryset = self.queryset.filter(category__name=category)
        serializer = ServerSerializer(self.queryset, many=True)

        return Response(serializer.data)
