import imp
from django.contrib import admin
from django.db import router
from django.urls import path
from server.views import ServerListViewSet, CategoryListViewSet

#drf-spectacular
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from webchat.consumer import MyConsumer

#  instantiate
router = DefaultRouter()
# Register
router.register("api/server/select", ServerListViewSet)
router.register("api/server/category", CategoryListViewSet)


urlpatterns = [
    path("admin/", admin.site.urls),
    
    # drf-spectacular urls
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
] + router.urls

websocket_urlpatterns = [
    path("ws/test", MyConsumer.as_asgi())
 ]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
