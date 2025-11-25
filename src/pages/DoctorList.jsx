import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await API.get('/doctors');
      setDoctors(res.data);
    };
    load();
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      <div className="grid">
        {doctors.map(d => (
          <div key={d._id} className="card">
            <h3>{d.user.name}</h3>
            <p>Specialization: {d.specialization}</p>
            <p>Experience: {d.experienceYears} years</p>
            <Link to={`/book/${d.user._id}`} className="btn">Book</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
