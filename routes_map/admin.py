from django.contrib import admin
from .models import Route

@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ('name', 'year', 'type', 'distance_km', 'line_width', 'line_color', 'is_active')
    list_filter = ('year', 'type', 'is_active')
    search_fields = ('name', 'start_location')
    list_editable = ('is_active', 'line_width', 'line_color')

    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'year', 'type', 'description', 'gpx_file', 'map_image')
        }),
        ('Параметры маршрута', {
            'fields': ('distance_km', 'start_location', 'is_active')
        }),
        ('Стиль отображения на карте', {
            'fields': ('line_width', 'line_color', 'line_opacity'),
            'classes': ('collapse',)
        }),
        ('Технические данные', {
            'fields': ('track_geojson', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    readonly_fields = ('track_geojson', 'created_at', 'updated_at')