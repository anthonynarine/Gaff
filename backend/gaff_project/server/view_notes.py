from django.shortcuts import render
from .models import Server
from rest_framework import viewsets
from .serializer import ServerSerializer
from rest_framework.response import Response


""" ViewSets are class based views provided by (DRF),that allow
 developers to CRUD a model with the least amount of code
 possible. ViewSets are all about organization and
 less repetition. They help in creating APIs that expose
 the same type of actions over different models."""


# our class will inheret the buit in CRUD methods of viewset
# w/ viewset.ViewSet we need to define the actions ("list, create,
# retrieve, update, partial_update and destroy")
class ServerListViewSet(viewsets.ViewSet):
    """
    ServerListViewSet ViewSet.

    This is a Django Rest Framework ViewSet for the Server model. It provides a custom
    'list' action that filters servers by category if provided in the request's query parameters.

    Class Attributes:
        queryset: This is the default QuerySet used by this ViewSet. In this case, it
                  retrieves all Server objects from the database.
    """

    queryset = Server.objects.all()  # Fetch all Server objects from the database.
    # extend whith self keyword

    def list(self, request):
        """
        List servers.

        This is a custom implementation of the 'list' action. It retrieves a list of all servers,
        but filters them by category if a 'category' query parameter is provided in the request.

        Returns:
            A list of servers, potentially filtered by category.
        """
        # store the Category data
        category = request.query_params.get(
            "category"
        )  # Get 'category' from the query parameters.

        if category:
            # queryset the data store it and filter it by category
            self.queryset = self.queryset.filter(
                #double underscores allows us to traverse to the category name 
                category__name=category
            )  # Filter Servers by category if it's provided.
            # convert the data to json 
        serializer = ServerSerializer(self.queryset, many=True)

        return Response(serializer.data)
