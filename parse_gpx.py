import os
import django
import gpxpy
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'may_walk_site.settings')
django.setup()

from routes_map.models import Route


def parse_all_routes():
    routes = Route.objects.all()

    for route in routes:
        if route.gpx_file and not route.track_geojson:
            try:
                print(f"🔄 Парсим: {route.name}")

                # Полный путь к файлу
                file_path = route.gpx_file.path
                print(f"Файл: {file_path}")

                with open(file_path, 'r', encoding='utf-8') as f:
                    gpx_content = f.read()
                    gpx = gpxpy.parse(gpx_content)

                    geojson = {
                        "type": "FeatureCollection",
                        "features": []
                    }

                    for track in gpx.tracks:
                        print(f"  Трек: {track.name}")
                        for segment in track.segments:
                            coordinates = [[point.longitude, point.latitude] for point in segment.points]
                            print(f"    Точек: {len(coordinates)}")

                            if coordinates:
                                feature = {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "LineString",
                                        "coordinates": coordinates
                                    },
                                    "properties": {
                                        "name": track.name or route.name
                                    }
                                }
                                geojson['features'].append(feature)

                    if geojson['features']:
                        route.track_geojson = json.dumps(geojson)
                        route.save()
                        print(f"✅ Успешно! Треков: {len(geojson['features'])}")
                    else:
                        print("⚠️ Нет треков в файле")

            except Exception as e:
                print(f"❌ Ошибка: {e}")


if __name__ == "__main__":
    parse_all_routes()