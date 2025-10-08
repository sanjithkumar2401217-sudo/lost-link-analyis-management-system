
import React, { useState, useCallback, useEffect } from 'react';
// FIX: Updated react-router-dom imports from v6 to v5 syntax to resolve module export errors.
import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './pages/Dashboard';
import LostItemsPage from './pages/LostItemsPage';
import FoundItemsPage from './pages/FoundItemsPage';
import OwnersPage from './pages/OwnersPage';
import HandoversPage from './pages/HandoversPage';
import { MOCK_LOST_ITEMS, MOCK_FOUND_ITEMS } from '../constants';
import type { LostItem, FoundItem } from '../types';

interface MainLayoutProps {
  theme: string;
  toggleTheme: () => void;
  onLogout: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ theme, toggleTheme, onLogout }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  const [lostItems, setLostItems] = useState<LostItem[]>(() => {
    try {
      const saved = localStorage.getItem('lostItems');
      return saved ? JSON.parse(saved) : MOCK_LOST_ITEMS;
    } catch (error) {
      console.error('Failed to parse lost items from localStorage', error);
      return MOCK_LOST_ITEMS;
    }
  });

  const [foundItems, setFoundItems] = useState<FoundItem[]>(() => {
    try {
      const saved = localStorage.getItem('foundItems');
      return saved ? JSON.parse(saved) : MOCK_FOUND_ITEMS;
    } catch (error) {
      console.error('Failed to parse found items from localStorage', error);
      return MOCK_FOUND_ITEMS;
    }
  });

  useEffect(() => {
    localStorage.setItem('lostItems', JSON.stringify(lostItems));
  }, [lostItems]);

  useEffect(() => {
    localStorage.setItem('foundItems', JSON.stringify(foundItems));
  }, [foundItems]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className={`${theme} flex h-screen bg-gray-100 dark:bg-gray-900`}>
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header toggleTheme={toggleTheme} theme={theme} toggleSidebar={toggleSidebar} onLogout={onLogout} />
        <main className="flex-1 p-6 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {/* FIX: Replaced v6 <Routes> component with v5 <Switch> and updated routing logic. */}
          <Switch>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route path="/dashboard">
              <Dashboard lostItems={lostItems} foundItems={foundItems} />
            </Route>
            <Route path="/lost-items">
              <LostItemsPage items={lostItems} setItems={setLostItems} />
            </Route>
            <Route path="/found-items">
              <FoundItemsPage items={foundItems} setItems={setFoundItems} />
            </Route>
            <Route path="/owner-details">
              <OwnersPage />
            </Route>
            <Route path="/handover-details">
              <HandoversPage />
            </Route>
            <Route path="*">
              <Redirect to="/dashboard" />
            </Route>
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
