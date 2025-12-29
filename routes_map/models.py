from django.db import models
import gpxpy
import json

class Route(models.Model):
    name = models.CharField(max_length=255, verbose_name="Название маршрута")
    gpx_file = models.FileField(upload_to='gpx_files/', verbose_name="GPX-файл")

    line_width = models.IntegerField(
        default=3,
        verbose_name="Толщина линии",
        help_text="Толщина линии на карте (1-10 пикселей)"
    )
    line_color = models.CharField(
        max_length=7,
        default='#3388ff',
        verbose_name="Цвет линии",
        help_text="HEX цвет, например #ff0000 для красного"
    )
    line_opacity = models.FloatField(
        default=0.7,
        verbose_name="Прозрачность линии",
        help_text="От 0.0 (полностью прозрачно) до 1.0 (непрозрачно)"
    )

    YEAR_CHOICES = [(r, r) for r in range(1980, 2030)]
    year = models.IntegerField(choices=YEAR_CHOICES, verbose_name="Год проведения")
    map_image = models.ImageField(
        upload_to='route_maps/',
        blank=True,
        null=True,
        verbose_name="Карта маршрута"
    )
    TYPE_CHOICES = [
        ('foot', 'Пеший'),
        ('bike', 'Велосипедный'),
    ]
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='foot', verbose_name="Тип маршрута")
    distance_km = models.FloatField(verbose_name="Протяженность (км)")
    start_location = models.CharField(max_length=255, blank=True, verbose_name="Место старта")
    description = models.TextField(blank=True, verbose_name="Описание")
    track_geojson = models.TextField(blank=True, null=True, verbose_name="Трек в формате GeoJSON")
    is_active = models.BooleanField(default=True, verbose_name="Активный маршрут")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.year} - {self.name} ({self.type})"

    class Meta:
        verbose_name = "Маршрут"
        verbose_name_plural = "Маршруты"
        ordering = ['-year', 'name']

    def save(self, *args, **kwargs):
        # Сначала сохраняем чтобы файл был доступен
        super().save(*args, **kwargs)

        # Затем парсим GPX если файл есть, а GeoJSON нет
        if self.gpx_file and (not self.track_geojson or self.track_geojson == "GPX_loaded_but_parsing_disabled"):
            try:
                print(f"🔄 Парсим GPX файл: {self.gpx_file.path}")

                with open(self.gpx_file.path, 'r', encoding='utf-8') as gpx_file:
                    gpx_content = gpx_file.read()
                    gpx = gpxpy.parse(gpx_content)

                    geojson = {
                        "type": "FeatureCollection",
                        "features": []
                    }

                    for track in gpx.tracks:
                        for segment in track.segments:
                            coordinates = [[point.longitude, point.latitude] for point in segment.points]
                            if coordinates:
                                feature = {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "LineString",
                                        "coordinates": coordinates
                                    },
                                    "properties": {
                                        "name": track.name or self.name,
                                        "year": self.year,
                                        "type": self.type
                                    }
                                }
                                geojson['features'].append(feature)

                    if geojson['features']:
                        self.track_geojson = json.dumps(geojson)
                        print(f"✅ Сгенерирован GeoJSON с {len(geojson['features'])} треками")

                        # Сохраняем снова с GeoJSON
                        super().save(update_fields=['track_geojson'])
                    else:
                        print("⚠️ В GPX файле нет треков с координатами")

            except Exception as e:
                print(f"❌ Ошибка парсинга GPX: {e}")