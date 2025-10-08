
import React, { useState, useCallback, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard lostItems={lostItems} foundItems={foundItems} />} />
            <Route path="/lost-items" element={<LostItemsPage items={lostItems} setItems={setLostItems} />} />
            <Route path="/found-items" element={<FoundItemsPage items={foundItems} setItems={setFoundItems} />} />
            <Route path="/owner-details" element={<OwnersPage />} />
            <Route path="/handover-details" element={<HandoversPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
