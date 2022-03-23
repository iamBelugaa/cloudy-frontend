import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FourOhFourPage from '../pages/404Page';
import DashboardPage from '../pages/Dashboard';
import LoginPage from '../pages/LoginPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import SignUp from '../pages/SignUpPage';
import HomePage from '../pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/*" element={<FourOhFourPage />} />
      </Routes>
    </Router>
  );
}

export default App;
