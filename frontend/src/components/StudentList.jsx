import { useState, useEffect } from 'react';

function StudentList({ onDataAdded }) {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', phone: '', age: '' });

  const fetchStudents = () => {
    fetch('https://edumanage-fullstack.onrender.com/api/students/')
      .then(res => res.json()).then(data => setStudents(data));
  };

  useEffect(() => { fetchStudents(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('https://edumanage-fullstack.onrender.com/api/students/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
    }).then(res => {
      if(res.ok) { fetchStudents(); onDataAdded(); setFormData({ first_name: '', last_name: '', email: '', phone: '', age: '' }); }
    });
  };

  const handleDelete = (id) => {
    if(window.confirm("Delete this student?")) {
      fetch(`https://edumanage-fullstack.onrender.com/api/students/${id}/`, { method: 'DELETE' })
      .then(() => fetchStudents());
    }
  };

  return (
    <div>
      <div className="form-container">
        <h3>Add New Student</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} required />
          <input type="text" placeholder="Last Name" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} required />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="text" placeholder="Phone" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required />
          <input type="number" placeholder="Age" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} required />
          <button type="submit">Add Student</button>
        </form>
      </div>

      <div className="student-section">
        <h2>Registered Students</h2>
        <div className="table-container">
          <table>
            <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Age</th><th>Action</th></tr></thead>
            <tbody>
              {students.map(s => (
                <tr key={s.id}>
                  <td>{s.id}</td><td>{s.first_name} {s.last_name}</td><td>{s.email}</td><td>{s.phone}</td><td>{s.age}</td>
                  <td><button className="delete-btn" onClick={() => handleDelete(s.id)} style={{background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer'}}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default StudentList;
