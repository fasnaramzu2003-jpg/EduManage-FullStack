import { useState } from 'react';
import './App.css';
import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import CourseList from './components/CourseList';
import AttendanceList from './components/AttendanceList';

function App() {
  const [activeTab, setActiveTab] = useState('students');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataAdded = () => setRefreshKey(oldKey => oldKey + 1);

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <h1>EduManage</h1>
        <p>Complete School Management System</p>
      </header>

      <div className="tabs">
        <button onClick={() => setActiveTab('students')} className={activeTab === 'students' ? 'active' : ''}>Students</button>
        <button onClick={() => setActiveTab('teachers')} className={activeTab === 'teachers' ? 'active' : ''}>Teachers</button>
        <button onClick={() => setActiveTab('courses')} className={activeTab === 'courses' ? 'active' : ''}>Courses</button>
        <button onClick={() => setActiveTab('attendance')} className={activeTab === 'attendance' ? 'active' : ''}>Attendance</button>
      </div>
      
      <main>
        {activeTab === 'students' && <StudentList key={refreshKey} onDataAdded={handleDataAdded} />}
        {activeTab === 'teachers' && <TeacherList key={refreshKey} onDataAdded={handleDataAdded} />}
        {activeTab === 'courses' && <CourseList key={refreshKey} onDataAdded={handleDataAdded} />}
        {activeTab === 'attendance' && <AttendanceList key={refreshKey} onDataAdded={handleDataAdded} />}
      </main>
    </div>
  );
}

export default App;
