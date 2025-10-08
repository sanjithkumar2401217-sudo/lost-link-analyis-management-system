
import React, { useState, useEffect, useCallback } from 'react';
// FIX: Updated react-router-dom imports from v6 to v5 syntax to resolve module export errors.
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
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
      {/* FIX: Replaced v6 <Routes> component with v5 <Switch> and updated routing logic. */}
      <Switch>
        {!isAuthenticated ? (
          <>
            <Route path="/login">
              <LoginPage onLogin={handleLogin} />
            </Route>
            <Route path="*">
              <Redirect to="/login" />
            </Route>
          </>
        ) : (
          <>
            <Route path="/login">
              <Redirect to="/dashboard" />
            </Route>
            {/* FIX: Changed path from `/*` to `/` for v5 compatibility. */}
            <Route path="/">
              <MainLayout theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
            </Route>
          </>
        )}
      </Switch>
    </HashRouter>
  );
};

export default App;
