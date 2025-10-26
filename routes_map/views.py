from django.views.generic import TemplateView

class MapView(TemplateView):
    template_name = 'routes_map/map.html'