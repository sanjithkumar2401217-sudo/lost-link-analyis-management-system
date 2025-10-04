import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import DashboardCard from '../DashboardCard';
import { SearchIcon, MagnifyingGlassIcon, ClipboardCheckIcon } from '../icons';
import type { LostItem, FoundItem } from '../../types';
import { ItemStatus } from '../../types';

interface DashboardProps {
    lostItems: LostItem[];
    foundItems: FoundItem[];
}

const Dashboard: React.FC<DashboardProps> = ({ lostItems, foundItems }) => {
    const totalLost = lostItems.length;
    const totalFound = foundItems.length;
    const totalPending = lostItems.filter(item => item.status === ItemStatus.Pending).length;
    
    const matchedItems = useMemo(() => {
        const foundItemNames = new Set(foundItems.map(f => f.item.toLowerCase().trim()));
        return lostItems.filter(l => l.status === ItemStatus.Pending && foundItemNames.has(l.item.toLowerCase().trim()));
    }, [lostItems, foundItems]);

    const dataByMonth = useMemo(() => {
        const months: { [key: string]: { name: string, lost: number, found: number } } = {
            "Jan": { name: 'Jan', lost: 0, found: 0 }, "Feb": { name: 'Feb', lost: 0, found: 0 },
            "Mar": { name: 'Mar', lost: 0, found: 0 }, "Apr": { name: 'Apr', lost: 0, found: 0 },
            "May": { name: 'May', lost: 0, found: 0 }, "Jun": { name: 'Jun', lost: 0, found: 0 },
            "Jul": { name: 'Jul', lost: 0, found: 0 }, "Aug": { name: 'Aug', lost: 0, found: 0 },
            "Sep": { name: 'Sep', lost: 0, found: 0 }, "Oct": { name: 'Oct', lost: 0, found: 0 },
            "Nov": { name: 'Nov', lost: 0, found: 0 }, "Dec": { name: 'Dec', lost: 0, found: 0 },
        };

        lostItems.forEach(item => {
            const month = new Date(item.lostDate).toLocaleString('default', { month: 'short' });
            if (months[month]) months[month].lost++;
        });

        foundItems.forEach(item => {
            const month = new Date(item.foundDate).toLocaleString('default', { month: 'short' });
            if (months[month]) months[month].found++;
        });

        return Object.values(months);
    }, [lostItems, foundItems]);
    
    const pieData = [
        { name: 'Pending', value: totalPending },
        { name: 'Found', value: lostItems.filter(i => i.status === ItemStatus.Found).length },
        { name: 'Claimed', value: lostItems.filter(i => i.status === ItemStatus.Claimed).length },
    ];
    const COLORS = ['#FFBB28', '#0088FE', '#00C49F'];

  return (
    <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>

        {matchedItems.length > 0 && (
             <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded-lg shadow-md" role="alert">
                <p className="font-bold">Potential Matches Found!</p>
                <p>{matchedItems.length} lost item(s) may have been found. Check the Lost & Found lists.</p>
                <ul className="list-disc list-inside mt-2">
                    {matchedItems.map(item => <li key={item.sn}>{item.item}</li>)}
                </ul>
            </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard title="Total Lost Items" value={totalLost} icon={<SearchIcon className="w-8 h-8 text-white"/>} color="bg-red-500" />
            <DashboardCard title="Total Found Items" value={totalFound} icon={<MagnifyingGlassIcon className="w-8 h-8 text-white"/>} color="bg-blue-500" />
            <DashboardCard title="Pending Items" value={totalPending} icon={<ClipboardCheckIcon className="w-8 h-8 text-white"/>} color="bg-yellow-500" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">Monthly Trends</h3>
                 <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dataByMonth} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                        <XAxis dataKey="name" tick={{ fill: 'rgb(156 163 175)' }} />
                        <YAxis tick={{ fill: 'rgb(156 163 175)' }} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', color: '#fff' }}/>
                        <Legend />
                        <Bar dataKey="lost" fill="#ef4444" name="Lost Items" />
                        <Bar dataKey="found" fill="#3b82f6" name="Found Items"/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                 <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-4">Lost Items Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        {/* FIX: Handle potentially undefined `percent` property from recharts Pie component to prevent type error. */}
                        <Pie data={pieData} cx="50%" cy="50%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value" nameKey="name" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(31, 41, 55, 0.8)', border: 'none', color: '#fff' }}/>
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    </div>
  );
};

export default Dashboard;