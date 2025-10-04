import React, { useState } from 'react';
import DataTable from '../DataTable';
import Modal from '../Modal';
import type { FoundItem } from '../../types';

interface FoundItemsPageProps {
    items: FoundItem[];
    setItems: React.Dispatch<React.SetStateAction<FoundItem[]>>;
}

const FoundItemsPage: React.FC<FoundItemsPageProps> = ({ items, setItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // FIX: Initialized state with default values to satisfy the type requirements.
  const [currentItem, setCurrentItem] = useState<Omit<FoundItem, 'sno'> & { sno?: number }>({ item: '', foundLocation: '', foundDate: '', claimed: false });

  const columns = [
    { accessor: 'sno' as keyof FoundItem, header: 'S.No.' },
    { accessor: 'item' as keyof FoundItem, header: 'Item' },
    { accessor: 'foundLocation' as keyof FoundItem, header: 'Found Location' },
    { accessor: 'foundDate' as keyof FoundItem, header: 'Found Date' },
    { accessor: 'claimed' as keyof FoundItem, header: 'Claimed', render: (item: FoundItem) => item.claimed ? 'Yes' : 'No' },
  ];

  const openAddModal = () => {
    setCurrentItem({ item: '', foundLocation: '', foundDate: '', claimed: false });
    setIsModalOpen(true);
  };
  
  const handleSaveItem = () => {
      if (!currentItem.item || !currentItem.foundLocation || !currentItem.foundDate) {
          alert('Please fill out all required fields.');
          return;
      }

      if (currentItem.sno) {
        // Edit logic
      } else {
        // Add logic
        const newId = items.length > 0 ? Math.max(...items.map(i => i.sno)) + 1 : 1;
        const newItem: FoundItem = {
            sno: newId,
            item: currentItem.item,
            foundLocation: currentItem.foundLocation,
            foundDate: currentItem.foundDate,
            claimed: currentItem.claimed ?? false
        };
        setItems([...items, newItem]);
      }
      setIsModalOpen(false);
  };


  const handleEditItem = (item: FoundItem) => {
    alert(`Editing item: ${item.item}`);
    // Future implementation:
    // setCurrentItem(item);
    // setIsModalOpen(true);
  };

  const handleDeleteItem = (itemToDelete: FoundItem) => {
     if(window.confirm(`Are you sure you want to delete the record for ${itemToDelete.item}?`)){
        setItems(items.filter(item => item.sno !== itemToDelete.sno));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Found Items</h1>
      <DataTable
        columns={columns}
        data={items}
        onAdd={openAddModal}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        addLabel="Add Found Item"
      />
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Add Found Item"
        footer={
            <>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
                <button onClick={handleSaveItem} className="px-4 py-2 font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Save Item</button>
            </>
        }
      >
        <form className="space-y-4">
            <div>
                <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Name</label>
                <input type="text" name="item" id="item" value={currentItem.item || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
                <label htmlFor="foundLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Found Location</label>
                <input type="text" name="foundLocation" id="foundLocation" value={currentItem.foundLocation || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
                <label htmlFor="foundDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Found Date</label>
                <input type="date" name="foundDate" id="foundDate" value={currentItem.foundDate || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
             <div className="flex items-center">
                <input id="claimed" name="claimed" type="checkbox" checked={currentItem.claimed || false} onChange={handleInputChange} className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label htmlFor="claimed" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Item has been claimed</label>
            </div>
        </form>
      </Modal>

    </div>
  );
};

export default FoundItemsPage;