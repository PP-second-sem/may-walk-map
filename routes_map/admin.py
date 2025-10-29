from django.contrib import admin
from .models import Route

@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'type', 'distance_km', 'start_location', 'is_active')
    list_filter = ('year', 'type', 'is_active')
    search_fields = ('name', 'start_location')
    list_editable = ('is_active',)