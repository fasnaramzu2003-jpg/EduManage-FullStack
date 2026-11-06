import { useState, useEffect } from 'react';

function TeacherList({ onDataAdded }) {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phone: '', subject: '' });

  const fetchTeachers = () => {
    fetch('http://127.0.0.1:8000/api/teachers/').then(res => res.json()).then(data => setTeachers(data));
  };

  useEffect(() => { fetchTeachers(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:8000/api/teachers/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
    }).then(() => { fetchTeachers(); onDataAdded(); setFormData({ first_name: '', last_name: '', email: '', phone: '', subject: '' }); });
  };

  return (
    <div>
      <div className="form-container">
        <h3>Add New Teacher</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} required />
          <input type="text" placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="text" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          <input type="text" placeholder="Subject" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} required />
          <button type="submit">Add Teacher</button>
        </form>
      </div>
      <div className="student-section">
        <h2>Registered Teachers</h2>
        <div className="table-container">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Subject</th><th>Email</th></tr></thead>
            <tbody>
              {teachers.map(t => (
                <tr key={t.id}><td>{t.id}</td><td>{t.first_name} {t.last_name}</td><td>{t.subject}</td><td>{t.email}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default TeacherList;
