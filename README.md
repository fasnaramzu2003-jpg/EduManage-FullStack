

# EduManage - Full Stack School Management System

A comprehensive Full-Stack web application built to manage educational institution workflows including Students, Teachers, Courses, and Attendance. 

## 🚀 Tech Stack
- **Backend:** Python, Django, Django REST Framework (DRF)
- **Frontend:** React.js, Vite, CSS3
- **Database:** SQLite (Development)
- **Tools:** Git, GitHub

## ✨ Features
- **Student Management:** Add and view student records.
- **Teacher Management:** Manage teacher profiles and their subjects.
- **Course Management:** Create courses and assign them to specific teachers.
- **Attendance Tracking:** Mark and view attendance for students by course and date.

## ⚙️ How to Run Locally

### 1. Backend Setup (Django)
```bash
cd backend
python -m venv venv
# Activate venv (Windows)
.\venv\Scripts\Activate.ps1
# Install dependencies
pip install django djangorestframework django-cors-headers
# Run migrations
python manage.py makemigrations
python manage.py migrate
# Start server
python manage.py runserver

### 2. Frontend Setup (React)

Open a new terminal and run the following commands:
```bash
cd frontend
npm install
npm run dev

`### 3. 🔗 API Endpoints`
```bash
- `GET/POST /api/students/`
- `GET/POST /api/teachers/`
- `GET/POST /api/courses/`
- `GET/POST /api/attendance/`
