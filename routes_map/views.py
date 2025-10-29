from django.views.generic import TemplateView

from rest_framework import generics
from .models import Route
from .serializers import RouteSerializer

class RouteListAPIView(generics.ListAPIView):
    queryset = Route.objects.filter(is_active=True)
    serializer_class = RouteSerializer

class MapView(TemplateView):
    template_name = 'routes_map/map.html'