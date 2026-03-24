import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  // Hide the navbar entirely if there is no logged-in user
  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Smart Code Translator</div>
      
      <div className="navbar-links">
        <Link to="/" className="nav-link">Editor</Link>
        <Link to="/history" className="nav-link">History</Link>
      </div>

      <div className="navbar-user">
        {user.picture ? (
          <img src={user.picture} alt="Profile Avatar" className="user-avatar" />
        ) : (
          <div className="user-avatar-placeholder">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
        <span className="user-name">{user.name}</span>
        
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
