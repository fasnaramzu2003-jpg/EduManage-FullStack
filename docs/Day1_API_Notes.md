# Day 1: Django API Notes

## 1. Setup Commands
- Activate venv: `.\venv\Scripts\Activate.ps1`
- Create project: `django-admin startproject config .`
- Create app: `python manage.py startapp students`
- Make migrations: `python manage.py makemigrations`
- Migrate: `python manage.py migrate`
- Run server: `python manage.py runserver`
- Create admin: `python manage.py createsuperuser`

## 2. Models (models.py)
- A class that inherits from `models.Model`.
- Fields: `CharField`, `EmailField`, `PositiveIntegerField`, `DateField(auto_now_add=True)`.
- `__str__` method to return a readable string.

## 3. Serializers (serializers.py)
- Converts Django models to JSON and vice versa.
- Use `ModelSerializer` for automatic field generation.
- `fields = '__all__'` to include all model fields.

## 4. Views (views.py)
- `ListCreateAPIView`: For GET (list all) and POST (create new).
- `RetrieveUpdateDestroyAPIView`: For GET (one), PUT (update), DELETE (delete).

## 5. URLs (config/urls.py + students/urls.py)
- Main project routes use `include()` to point to app routes.
- App routes use `path('students/', View.as_view())`.

## 5. Postman
- Used to test GET, POST, PUT, DELETE.
- Always select: `Body` -> `raw` -> `JSON` for POST/PUT.
