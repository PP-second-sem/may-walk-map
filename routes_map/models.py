from django.db import models


class Route(models.Model):
    # Основная информация
    name = models.CharField(max_length=255, verbose_name="Название маршрута")
    gpx_file = models.FileField(upload_to='gpx_files/', verbose_name="GPX-файл")

    # Мета-информация для фильтров
    YEAR_CHOICES = [(r, r) for r in range(1980, 2030)]
    year = models.IntegerField(choices=YEAR_CHOICES, verbose_name="Год проведения")

    TYPE_CHOICES = [
        ('foot', 'Пеший'),
        ('bike', 'Велосипедный'),
    ]
    type = models.CharField(max_length=10, choices=TYPE_CHOICES, default='foot', verbose_name="Тип маршрута")

    distance_km = models.FloatField(verbose_name="Протяженность (км)")
    start_location = models.CharField(max_length=255, blank=True, verbose_name="Место старта")
    description = models.TextField(blank=True, verbose_name="Описание")

    # Это поле будет заполняться автоматически при загрузке GPX
    track_geojson = models.TextField(blank=True, null=True, verbose_name="Трек в формате GeoJSON")

    # Служебные поля
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
        # Упрощенная версия - просто отмечаем что файл есть
        if self.gpx_file and not self.track_geojson:
            self.track_geojson = "GPX_loaded_but_parsing_disabled"

        super().save(*args, **kwargs)