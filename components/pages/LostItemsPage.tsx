
import React from 'react';
import DataTable from '../DataTable';
import type { LostItem } from '../../types';

interface LostItemsPageProps {
    items: LostItem[];
    setItems: React.Dispatch<React.SetStateAction<LostItem[]>>;
}

const LostItemsPage: React.FC<LostItemsPageProps> = ({ items, setItems }) => {
  const columns = [
    { accessor: 'sn' as keyof LostItem, header: 'S.N.' },
    { accessor: 'item' as keyof LostItem, header: 'Item' },
    { accessor: 'lostLocation' as keyof LostItem, header: 'Lost Location' },
    { accessor: 'lostDate' as keyof LostItem, header: 'Lost Date' },
    { accessor: 'status' as keyof LostItem, header: 'Status' },
  ];

  // In a real app, these handlers would call an API.
  // Here we're just simulating it with local state.
  const handleAddItem = () => {
    // This would open a modal to add a new item.
    alert('Add new lost item functionality to be implemented.');
  };

  const handleEditItem = (item: LostItem) => {
    alert(`Editing item: ${item.item}`);
  };

  const handleDeleteItem = (itemToDelete: LostItem) => {
    if(window.confirm(`Are you sure you want to delete the record for ${itemToDelete.item}?`)){
       setItems(items.filter(item => item.sn !== itemToDelete.sn));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Lost Items</h1>
      <DataTable
        columns={columns}
        data={items}
        onAdd={handleAddItem}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        addLabel="Add Lost Item"
      />
    </div>
  );
};

export default LostItemsPage;
