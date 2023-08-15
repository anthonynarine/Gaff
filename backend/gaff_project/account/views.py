from http.client import responses
from operator import truediv
from django.shortcuts import render
from rest_framework import viewsets
from yaml import serialize
from .models import Account
from rest_framework.response import Response
from .serializers import AccountSerializer
from .schemas import user_list_docs



class AccountViewSet(viewsets.ViewSet):
    queryset = Account.objects.all()
    
    @user_list_docs
    def list(self, request):
        user_id = request.query_params.get("user_id")
        queryset = self.queryset.get(id=user_id)
        serializer = AccountSerializer(queryset)
        return Response(serializer.data)