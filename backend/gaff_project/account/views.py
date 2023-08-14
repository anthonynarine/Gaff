from http.client import responses
from django.shortcuts import render
from rest_framework import viewsets
from yaml import serialize
from .models import Account
from rest_framework.response import Response
from .serializers import AccountSerializer
from drf_spectacular.utils import extend_schema



class AccountViewSet(viewsets.ViewSet):
    queryset = Account
    
    @extend_schema(responses=AccountSerializer)
    def list(self, requet):
        serializer = AccountSerializer(self.queryset)
        return Response(serializer.data)