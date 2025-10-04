
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainLayout from './components/MainLayout';

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('isAuthenticated'));

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleLogin = useCallback(() => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  }, []);

  return (
    <HashRouter>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<Navigate to="/dashboard" replace />} />
            <Route path="/*" element={<MainLayout theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />} />
          </>
        )}
      </Routes>
    </HashRouter>
  );
};

export default App;
