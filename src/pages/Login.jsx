import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const handle = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data.user, res.data.token);
      nav('/');
    } catch (error) {
      setErr(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input name="email" value={form.email} onChange={handle} placeholder="Email" required />
        <input name="password" value={form.password} onChange={handle} placeholder="Password" type="password" required />
        <button type="submit">Login</button>
      </form>
      {err && <p className="error">{err}</p>}
    </div>
  );
}
