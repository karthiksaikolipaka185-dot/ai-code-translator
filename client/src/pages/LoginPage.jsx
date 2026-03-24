import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { register, emailLogin, googleLogin as googleLoginService } from '../services/authService.js';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import './login.css';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { user, loginUser } = useAuth();
  const navigate = useNavigate();

  // 1. Redirect if already logged in
  if (user) {
    return <Navigate to="/" />;
  }

  // 2. Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const data = await register(name, email, password);
        loginUser(data.token, data.user);
        toast.success(`Welcome, ${data.user.name}!`);
      } else {
        const data = await emailLogin(email, password);
        loginUser(data.token, data.user);
        toast.success(`Welcome back, ${data.user.name}!`);
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Google Login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const data = await googleLoginService(credentialResponse.credential);
      loginUser(data.token, data.user);
      toast.success('Successfully logged in with Google!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Google Login Failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>
        
        <form onSubmit={handleSubmit}>
          {isSignUp && (
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="toggle-container">
          <button 
            type="button" 
            onClick={() => setIsSignUp(!isSignUp)} 
            className="toggle-btn"
          >
            {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="google-btn-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => toast.error('Google Sign-In Failed')}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
