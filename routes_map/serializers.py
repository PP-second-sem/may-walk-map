from rest_framework import serializers
from .models import Route


class RouteSerializer(serializers.ModelSerializer):
    map_image_url = serializers.SerializerMethodField()

    def get_map_image_url(self, obj):
        if obj.map_image:
            return obj.map_image.url
        return None

    class Meta:
        model = Route
        fields = '__all__'