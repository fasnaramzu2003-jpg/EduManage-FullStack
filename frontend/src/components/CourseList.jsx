import { useState, useEffect } from 'react';

function CourseList({ onDataAdded }) {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ course_name: '', course_code: '', teacher: '' });

  const fetchCourses = () => {
    fetch('https://edumanage-fullstack.onrender.com/api/courses/').then(res => res.json()).then(data => setCourses(data));
  };

  useEffect(() => { 
    fetchCourses();
    fetch('https://edumanage-fullstack.onrender.com/api/teachers/').then(res => res.json()).then(data => setTeachers(data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://edumanage-fullstack.onrender.com/api/courses/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
    }).then(() => { fetchCourses(); onDataAdded(); setFormData({ course_name: '', course_code: '', teacher: '' }); });
  };

  return (
    <div>
      <div className="form-container">
        <h3>Add New Course</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Course Name" value={formData.course_name} onChange={e => setFormData({...formData, course_name: e.target.value})} required />
          <input type="text" placeholder="Course Code" value={formData.course_code} onChange={e => setFormData({...formData, course_code: e.target.value})} required />
          <select value={formData.teacher} onChange={e => setFormData({...formData, teacher: e.target.value})} required>
            <option value="">Select Teacher</option>
            {teachers.map(t => <option key={t.id} value={t.id}>{t.first_name} {t.last_name}</option>)}
          </select>
          <button type="submit">Add Course</button>
        </form>
      </div>
      <div className="student-section">
        <h2>Registered Courses</h2>
        <div className="table-container">
          <table>
            <thead><tr><th>ID</th><th>Code</th><th>Name</th><th>Teacher</th></tr></thead>
            <tbody>
              {courses.map(c => (
                <tr key={c.id}><td>{c.id}</td><td>{c.course_code}</td><td>{c.course_name}</td><td>{c.teacher_name}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default CourseList;
