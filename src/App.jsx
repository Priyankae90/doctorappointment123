import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorList from './pages/DoctorList';
import Booking from './pages/Booking';
import MyAppointments from './pages/MyAppointments';
import Navbar from './components/Navbar';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<DoctorList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/book/:doctorId" element={<PrivateRoute><Booking /></PrivateRoute>} />
            <Route path="/my-appointments" element={<PrivateRoute><MyAppointments /></PrivateRoute>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
