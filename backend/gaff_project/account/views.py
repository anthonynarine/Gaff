from http.client import responses
from operator import truediv
from django.shortcuts import render
from rest_framework import viewsets
from yaml import serialize
from .models import Account
from rest_framework.response import Response
from .serializers import AccountSerializer
from .schemas import user_list_docs
from rest_framework.permissions import IsAuthenticated



class AccountViewSet(viewsets.ViewSet):
    """
    ViewSet for handling Account related operations.
    """
    
    # Default queryset for fetching Account objects
    queryset = Account.objects.all()
    permission_classes = [IsAuthenticated]
    
    @user_list_docs
    def list(self, request):
        """
        List an account based on user_id.
        
        Parameters:
        - request: HTTP request object containing query parameters.
        
        Returns:
        - HTTP Response containing serialized account data.
        """
        # Extracting user_id from the request's query parameters
        user_id = request.query_params.get("user_id")
        
        # Filtering the account based on provided user_id
        queryset = self.queryset.get(id=user_id)
        
        # Serializing the fetched account object
        serializer = AccountSerializer(queryset)
        
        # Returning serialized account data
        return Response(serializer.data)
