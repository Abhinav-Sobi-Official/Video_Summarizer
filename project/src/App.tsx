import React, { useState } from 'react';
import { Youtube, Upload, Volume2, FileText, LogIn, UserPlus } from 'lucide-react';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const handleLogin = (email: string, password: string) => {
    // Simulate authentication
    setIsAuthenticated(true);
  };

  const handleSignup = (email: string, password: string) => {
    // Simulate signup
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {!isAuthenticated ? (
        <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;