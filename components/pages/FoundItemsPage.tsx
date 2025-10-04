
import React from 'react';
import DataTable from '../DataTable';
import type { FoundItem } from '../../types';

interface FoundItemsPageProps {
    items: FoundItem[];
    setItems: React.Dispatch<React.SetStateAction<FoundItem[]>>;
}

const FoundItemsPage: React.FC<FoundItemsPageProps> = ({ items, setItems }) => {
  const columns = [
    { accessor: 'sno' as keyof FoundItem, header: 'S.No.' },
    { accessor: 'item' as keyof FoundItem, header: 'Item' },
    { accessor: 'foundLocation' as keyof FoundItem, header: 'Found Location' },
    { accessor: 'foundDate' as keyof FoundItem, header: 'Found Date' },
    { accessor: 'claimed' as keyof FoundItem, header: 'Claimed', render: (item: FoundItem) => item.claimed ? 'Yes' : 'No' },
  ];

  const handleAddItem = () => {
    alert('Add new found item functionality to be implemented.');
  };

  const handleEditItem = (item: FoundItem) => {
    alert(`Editing item: ${item.item}`);
  };

  const handleDeleteItem = (itemToDelete: FoundItem) => {
     if(window.confirm(`Are you sure you want to delete the record for ${itemToDelete.item}?`)){
        setItems(items.filter(item => item.sno !== itemToDelete.sno));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Found Items</h1>
      <DataTable
        columns={columns}
        data={items}
        onAdd={handleAddItem}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        addLabel="Add Found Item"
      />
    </div>
  );
};

export default FoundItemsPage;
