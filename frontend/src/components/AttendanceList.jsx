import { useState, useEffect } from 'react';
function AttendanceList({ onDataAdded }) {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ student: '', course: '', date: new Date().toISOString().split('T')[0], status: 'Present' });

  const fetchAttendance = () => {
    fetch('https://edumanage-fullstack.onrender.com/api/attendance/').then(res => res.json()).then(data => setAttendance(data));
  };

  useEffect(() => { 
    fetchAttendance();
    fetch('https://edumanage-fullstack.onrender.com/api/students/').then(res => res.json()).then(data => setStudents(data));
    fetch('https://edumanage-fullstack.onrender.com/api/courses/').then(res => res.json()).then(data => setCourses(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://edumanage-fullstack.onrender.com/api/attendance/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
    }).then(() => { fetchAttendance(); onDataAdded(); setFormData({...formData, student: '', course: ''}); });
  };

  return (
    <div>
      <div className="form-container">
        <h3>Mark Attendance</h3>
        <form onSubmit={handleSubmit}>
          <select value={formData.student} onChange={e => setFormData({...formData, student: e.target.value})} required>
            <option value="">Select Student</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.first_name} {s.last_name}</option>)}
          </select>
          <select value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} required>
            <option value="">Select Course</option>
            {courses.map(c => <option key={c.id} value={c.id}>{c.course_code} - {c.course_name}</option>)}
          </select>
          <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
          <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} required>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
          </select>
          <button type="submit" style={{background: '#3498db'}}>Mark</button>
        </form>
      </div>
      <div className="student-section">
        <h2>Attendance Records</h2>
        <div className="table-container">
          <table>
            <thead><tr><th>Date</th><th>Student</th><th>Course</th><th>Status</th></tr></thead>
            <tbody>
              {attendance.map(a => (
                <tr key={a.id}>
                  <td>{a.date}</td>
                  <td>{a.student_name}</td>
                  <td>{a.course_name}</td>
                  <td><span style={{ color: a.status === 'Present' ? 'green' : a.status === 'Absent' ? 'red' : 'orange', fontWeight: 'bold' }}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AttendanceList;
