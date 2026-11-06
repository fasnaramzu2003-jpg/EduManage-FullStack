from rest_framework import generics
from .models import Student, Teacher, Course, Attendance
from .serializers import StudentSerializer, TeacherSerializer, CourseSerializer, AttendanceSerializer

class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherListCreateView(generics.ListCreateAPIView):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class AttendanceListCreateView(generics.ListCreateAPIView):
    queryset = Attendance.objects.all().order_by('-date')
    serializer_class = AttendanceSerializer

class StudentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer