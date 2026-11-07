import { useState, useEffect } from 'react';
import './App.css';
import { FiHome, FiUsers, FiBookOpen, FiCalendar } from 'react-icons/fi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


import StudentList from './components/StudentList';
import TeacherList from './components/TeacherList';
import CourseList from './components/CourseList';
import AttendanceList from './components/AttendanceList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0, attendance: 0 });
  const [chartData, setChartData] = useState([]);

  const API_URL = 'https://edumanage-fullstack.onrender.com/api';

  const fetchDashboardData = async () => {
    try {
      const [stuRes, teaRes, couRes, attRes] = await Promise.all([
        fetch(`${API_URL}/students/`),
        fetch(`${API_URL}/teachers/`),
        fetch(`${API_URL}/courses/`),
        fetch(`${API_URL}/attendance/`)
      ]);

      const students = await stuRes.json();
      const teachers = await teaRes.json();
      const courses = await couRes.json();
      const attendance = await attRes.json();

      setStats({
        students: students.length,
        teachers: teachers.length,
        courses: courses.length,
        attendance: attendance.length
      });

      const realStudentCount = students.length || 0;
      setChartData([
        { name: 'Jul', students: Math.floor(realStudentCount * 0.2) },
        { name: 'Aug', students: Math.floor(realStudentCount * 0.4) },
        { name: 'Sep', students: Math.floor(realStudentCount * 0.6) },
        { name: 'Oct', students: Math.floor(realStudentCount * 0.8) },
        { name: 'Nov', students: Math.floor(realStudentCount * 0.9) },
        { name: 'Dec', students: realStudentCount },
      ]);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [refreshKey]);

  const handleDataAdded = () => setRefreshKey(oldKey => oldKey + 1);

  return (
    <div className="app-container">
      
      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="logo-area">🎓 EduManage</div>
        
        {/* CHANGED TO BUTTONS FOR KEYBOARD NAVIGATION */}
        <div className="menu">
          <button className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>
            <FiHome /> Dashboard
          </button>
          <button className={`menu-item ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
            <FiUsers /> Students
          </button>
          <button className={`menu-item ${activeTab === 'teachers' ? 'active' : ''}`} onClick={() => setActiveTab('teachers')}>
            <FiUsers /> Teachers
          </button>
          <button className={`menu-item ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
            <FiBookOpen /> Courses
          </button>
          <button className={`menu-item ${activeTab === 'attendance' ? 'active' : ''}`} onClick={() => setActiveTab('attendance')}>
            <FiCalendar /> Attendance
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="main-content">
        
        {/* SIMPLIFIED TOPBAR (Removed Search, Bell, Admin) */}
        <div className="topbar">
          <h2 style={{ color: '#64748b', fontSize: '1.2rem', fontWeight: 600 }}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
          </h2>
        </div>

        {/* DYNAMIC CONTENT AREA */}
        <div className="content-area">
          
          {activeTab === 'dashboard' && (
            <>
              <div className="welcome-banner">
                <div className="banner-text">
                  <h1>Welcome to EduManage 👋</h1>
                  <p>Manage students, teachers, courses, and attendance — all in one place.</p>
                </div>
                <div className="banner-image">
                  {/* NEW RELIABLE IMAGE LINK */}
                  <img src="https://cdn-icons-png.flaticon.com/512/2602/2602419.png" alt="School Building" />
                </div>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#e0f2fe', color: '#0284c7' }}><FiUsers /></div>
                  <div className="stat-info">
                    <h3>{stats.students}</h3>
                    <p>Total Students</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><FiUsers /></div>
                  <div className="stat-info">
                    <h3>{stats.teachers}</h3>
                    <p>Total Teachers</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}><FiBookOpen /></div>
                  <div className="stat-info">
                    <h3>{stats.courses}</h3>
                    <p>Active Courses</p>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ background: '#fce7f3', color: '#db2777' }}><FiCalendar /></div>
                  <div className="stat-info">
                    <h3>{stats.attendance}</h3>
                    <p>Attendance Records</p>
                  </div>
                </div>
              </div>

              <div className="middle-grid">
                <div className="card">
                  <div className="card-header"><h2>Student Enrollment Trend</h2></div>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="students" stroke="#2563eb" strokeWidth={3} dot={{r: 4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="card">
                  <div className="card-header"><h2>Quick Actions</h2></div>
                  <div className="action-grid">
                    <button className="action-btn" style={{ background: '#e0f2fe', color: '#0284c7' }} onClick={() => setActiveTab('students')}><FiUsers size={24}/> Add Student</button>
                    <button className="action-btn" style={{ background: '#dcfce7', color: '#16a34a' }} onClick={() => setActiveTab('teachers')}><FiUsers size={24}/> Add Teacher</button>
                    <button className="action-btn" style={{ background: '#fef3c7', color: '#d97706' }} onClick={() => setActiveTab('courses')}><FiBookOpen size={24}/> Create Course</button>
                    <button className="action-btn" style={{ background: '#fce7f3', color: '#db2777' }} onClick={() => setActiveTab('attendance')}><FiCalendar size={24}/> Mark Attendance</button>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'students' && <StudentList key={refreshKey} onDataAdded={handleDataAdded} />}
          {activeTab === 'teachers' && <TeacherList key={refreshKey} onDataAdded={handleDataAdded} />}
          {activeTab === 'courses' && <CourseList key={refreshKey} onDataAdded={handleDataAdded} />}
          {activeTab === 'attendance' && <AttendanceList key={refreshKey} onDataAdded={handleDataAdded} />}

        </div>
      </div>
    </div>
  );
}

export default App;
