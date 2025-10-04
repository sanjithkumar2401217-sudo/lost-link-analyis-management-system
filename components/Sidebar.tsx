
import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, SearchIcon, MagnifyingGlassIcon, UserGroupIcon, ClipboardCheckIcon } from './icons';

interface SidebarProps {
  isOpen: boolean;
}

const navItems = [
  { to: '/dashboard', icon: DashboardIcon, label: 'Dashboard' },
  { to: '/lost-items', icon: SearchIcon, label: 'Lost Items' },
  { to: '/found-items', icon: MagnifyingGlassIcon, label: 'Found Items' },
  { to: '/owner-details', icon: UserGroupIcon, label: 'Owner Details' },
  { to: '/handover-details', icon: ClipboardCheckIcon, label: 'Handover Details' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const NavItem: React.FC<typeof navItems[0]> = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-4 py-3 text-sm font-medium transition-colors duration-200 transform rounded-lg hover:bg-primary-500 hover:text-white ${
          isActive ? 'bg-primary-600 text-white' : 'text-gray-600 dark:text-gray-300'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="mx-4">{label}</span>
    </NavLink>
  );

  return (
    <aside className={`z-20 flex-shrink-0 h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-0 overflow-hidden'}`}>
       <div className="py-4 text-gray-500 dark:text-gray-400">
         <a href="#" className="flex items-center text-lg font-bold text-gray-800 dark:text-white px-6">
           <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           <span className="ml-2">Lost Link</span>
         </a>
         <nav className="mt-8 px-4 space-y-2">
            {navItems.map(item => <NavItem key={item.to} {...item} />)}
         </nav>
       </div>
    </aside>
  );
};

export default Sidebar;
