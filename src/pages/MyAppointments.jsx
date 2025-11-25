import React, { useEffect, useState } from 'react';
import API from '../api';

export default function MyAppointments() {
  const [appts, setAppts] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await API.get('/appointments');
      setAppts(res.data);
    };
    load();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}/status`, { status });
      setAppts(prev => prev.map(a => a._id === id ? { ...a, status } : a));
    } catch (err) {
      alert('Error');
    }
  };

  return (
    <div>
      <h2>My Appointments</h2>
      {appts.length === 0 && <p>No appointments</p>}
      <div className="grid">
        {appts.map(a => (
          <div key={a._id} className="card">
            <p><strong>Doctor:</strong> {a.doctor.name || a.doctor.email}</p>
            <p><strong>Patient:</strong> {a.patient.name}</p>
            <p><strong>Date:</strong> {new Date(a.date).toLocaleString()}</p>
            <p><strong>Status:</strong> {a.status}</p>
            <div className="buttons">
              <button onClick={() => changeStatus(a._id, 'cancelled')}>Cancel</button>
              <button onClick={() => changeStatus(a._id, 'completed')}>Complete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
