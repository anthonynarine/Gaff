import imp
from xml.dom import UserDataHandler
from django.contrib import admin
from django.db import router
from django.urls import path
from account.views import AccountViewSet
from server.views import ServerListViewSet, CategoryListViewSet

#drf-spectacular
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from webchat.consumer import WebChatConsumer
from webchat.views import MessageViewSet

# simpleJwt
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


#  instantiate
router = DefaultRouter()
# Register
router.register("api/server/select", ServerListViewSet)
router.register("api/server/category", CategoryListViewSet)
router.register("api/message", MessageViewSet, basename="message")
router.register("api/account", AccountViewSet, basename="accounts")


urlpatterns = [
    path("admin/", admin.site.urls),
    
    # drf-spectacular urls
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    #simpleJWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + router.urls

websocket_urlpatterns = [
    path("<str:serverId>/<str:channelId>", WebChatConsumer.as_asgi())
 ]  #http://localhost:5173/server/1/1

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



