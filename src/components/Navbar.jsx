import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/login');
  };

  return (
    <nav className="nav">
      {/* LEFT SIDE LOGO / TITLE */}
      <div className="nav-left">
        <Link to="/" className="logo">DoctorCare</Link>
      </div>

      {/* RIGHT SIDE MENU */}
      <div className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>

        {user && (
          <>
            <Link to="/my-appointments">My Appointments</Link>
            <span className="user-tag">
              {user.name} ({user.role})
            </span>
            <button onClick={handleLogout} className="btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}


