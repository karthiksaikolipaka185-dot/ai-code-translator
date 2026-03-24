import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Navbar from './components/Navbar.jsx';

import HomePage from './pages/HomePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Navbar />
            <HomePage />
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/history" 
        element={
          <ProtectedRoute>
            <Navbar />
            <HistoryPage />
          </ProtectedRoute>
        } 
      />
      
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
