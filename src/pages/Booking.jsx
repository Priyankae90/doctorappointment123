import React, { useState, useContext } from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function Booking() {
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/appointments', { doctorId, date, reason });
      setMsg('Appointment requested');
      nav('/my-appointments');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="card">
      <h2>Book Appointment</h2>
      <form onSubmit={submit}>
        <label>Date & Time</label>
        <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} required />
        <textarea placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} />
        <button type="submit">Book</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
