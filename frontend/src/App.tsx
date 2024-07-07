import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import Payment from './components/Payment';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<AuthForm isRegister />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        
        {/* Default route */}
        <Route path="/" element={<AuthForm />} />

      </Routes>
    </Router>
  );
};

export default App;
