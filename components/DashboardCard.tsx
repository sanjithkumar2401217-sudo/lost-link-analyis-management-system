
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">{title}</p>
        <p className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;
