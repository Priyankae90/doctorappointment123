import React, { useState, useContext } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'patient', specialization: '' });
  const [err, setErr] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', form);
      login(res.data.user, res.data.token);
      nav('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input name="name" value={form.name} onChange={handle} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handle} placeholder="Email" required />
        <input name="password" value={form.password} onChange={handle} placeholder="Password" type="password" required />
        <select name="role" value={form.role} onChange={handle}>
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        {form.role === 'doctor' && (
          <>
            <input name="specialization" value={form.specialization} onChange={handle} placeholder="Specialization" />
          </>
        )}

        <button type="submit">Register</button>
      </form>
      {err && <p className="error">{err}</p>}
    </div>
  );
}
