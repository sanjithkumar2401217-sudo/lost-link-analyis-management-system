
import React from 'react';
import ThemeToggle from './ThemeToggle';
import { MenuIcon, SearchIcon, UserCircleIcon, LogoutIcon } from './icons';

interface HeaderProps {
  toggleTheme: () => void;
  theme: string;
  toggleSidebar: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleTheme, theme, toggleSidebar, onLogout }) => {
  return (
    <header className="relative z-10 flex-shrink-0 flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none lg:hidden">
            <MenuIcon className="w-6 h-6" />
        </button>
        <div className="relative hidden md:block ml-4">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="w-5 h-5 text-gray-400" />
            </span>
            <input 
                type="text" 
                placeholder="Search..." 
                className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
          <UserCircleIcon className="w-6 h-6" />
        </button>
        <button
          onClick={onLogout}
          title="Logout"
          className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
        >
          <LogoutIcon className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;
