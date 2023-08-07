"""
ASGI config for gaff_project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os


from channels.routing import ProtocolTypeRouter, URLRouter

from django.core.asgi import  get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gaff_project.settings")

django_application = get_asgi_application()

from .import urls



"""
The ProtocolTypeRouter class is an ASGI application that is used to route incoming 
connections to other ASGI applications based on the type of connection protocol. 
In this case, the router is set to handle both HTTP and WebSocket protocols.
"""
application = ProtocolTypeRouter(
    {
        # For HTTP requests, the standard Django ASGI application is used.
        # This means all regular Django views will be served by this application. 
        "http": get_asgi_application(),
        # For WebSocket requests, we point to our custom URL routing.
        # The URLRouter will then route the WebSocket request based on its path.
        "websocket": URLRouter(urls.websocket_urlpatterns),
    }
)
