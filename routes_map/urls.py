from django.urls import path
from .views import MapView, RouteListAPIView  # ← добавь RouteListAPIView

urlpatterns = [
    path('', MapView.as_view(), name='map_view'),
    path('api/routes/', RouteListAPIView.as_view(), name='routes_api'),  # ← добавь эту строку
]