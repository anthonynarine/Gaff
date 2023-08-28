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
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView



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
        
        # query the db for account based on provided user_id
        queryset = self.queryset.get(id=user_id)
        
        # Serializing the fetched account object
        serializer = AccountSerializer(queryset)
        
        # Returning serialized account data
        return Response(serializer.data)
    
class JWTSetCookieMixin:
    def finalize_response(self, request, response, *args, **kwargs):  # Notice the corrected name here
        response.set_cookie("hello", "hello", domain='127.0.0.1', path='/', samesite='Lax')
        return super().finalize_response(request, response, *args, **kwargs)

    
class JWTCookieTokenObtainView(JWTSetCookieMixin, TokenObtainPairView):
    pass





#                       Mixins
"""
Sure, mixins are a way in object-oriented programming to share methods
among different classes without resorting to inheritance from a base or
parent class. In Django, mixins are often used with class-based views 
to provide specific functionalities that can be combined or mixed 
in with other views."""