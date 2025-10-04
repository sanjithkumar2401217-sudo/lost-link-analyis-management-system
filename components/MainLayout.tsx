
import React, { useState, useCallback } from 'react';
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
  const [lostItems, setLostItems] = useState<LostItem[]>(MOCK_LOST_ITEMS);
  const [foundItems, setFoundItems] = useState<FoundItem[]>(MOCK_FOUND_ITEMS);

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
