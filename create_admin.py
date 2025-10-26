import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'may_walk_site.settings')
django.setup()

from django.contrib.auth.models import User

# Создаем администратора
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', '123456')
    print("Администратор создан: логин=admin, пароль=123456")
else:
    print("Администратор уже существует")