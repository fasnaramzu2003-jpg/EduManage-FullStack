# EduManage - Day 2 Master Notes

## 1. React Frontend Setup
- Used Vite to create the React app: `npm create vite@latest frontend -- --template react`
- Installed dependencies: `npm install`
- Started dev server: `npm run dev` (Runs on http://localhost:5173)

## 2. React Components & State
- Built `StudentList.jsx`, `TeacherList.jsx`, `CourseList.jsx`, `AttendanceList.jsx`.
- Used `useState` to manage form data and lists.
- Used `useEffect` to fetch data from Django backend on page load.

## 3. CRUD Operations in React
- **GET:** Fetched data using `fetch('http://127.0.0.1:8000/api/...')`.
- **POST:** Sent form data to Django using `method: 'POST'`.
- **DELETE:** Removed items using `method: 'DELETE'` and the item's ID.

## 4. Backend Expansion (Django)
- Added `Teacher`, `Course`, and `Attendance` models.
- Created Foreign Key relationships (e.g., Attendance links to Student and Course).
- Updated `views.py` with new API views for each model.
- Updated `urls.py` to route `/api/teachers/`, `/api/courses/`, etc.

## 5. CORS Configuration
- Faced CORS errors because React (Port 5173) was trying to access Django (Port 8000).
- Fixed by adding `corsheaders` to `INSTALLED_APPS` and `CorsMiddleware` to the top of `MIDDLEWARE` in `settings.py`.
