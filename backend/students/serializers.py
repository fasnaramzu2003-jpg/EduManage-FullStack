from rest_framework import serializers
from .models import Student, Teacher, Course, Attendance

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    teacher_name = serializers.ReadOnlyField(source='teacher.first_name')
    class Meta:
        model = Course
        fields = '__all__'

class AttendanceSerializer(serializers.ModelSerializer):
    student_name = serializers.ReadOnlyField(source='student.first_name')
    course_name = serializers.ReadOnlyField(source='course.course_name')
    class Meta:
        model = Attendance
        fields = '__all__'

