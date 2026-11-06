from django.urls import path
from .views import StudentListCreateView, TeacherListCreateView, CourseListCreateView, AttendanceListCreateView

urlpatterns = [
    path('students/', StudentListCreateView.as_view(), name='student-list'),
    path('teachers/', TeacherListCreateView.as_view(), name='teacher-list'),
    path('courses/', CourseListCreateView.as_view(), name='course-list'),
    path('attendance/', AttendanceListCreateView.as_view(), name='attendance-list'),
]
