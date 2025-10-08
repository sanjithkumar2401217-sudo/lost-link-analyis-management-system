
import React, { useState } from 'react';
import DataTable from '../DataTable';
import Modal from '../Modal';
import type { LostItem } from '../../types';
import { ItemStatus } from '../../types';

interface LostItemsPageProps {
    items: LostItem[];
    setItems: React.Dispatch<React.SetStateAction<LostItem[]>>;
}

const LostItemsPage: React.FC<LostItemsPageProps> = ({ items, setItems }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Omit<LostItem, 'sn'> & { sn?: number }>({ item: '', lostLocation: '', lostDate: '', status: ItemStatus.Pending });

  const columns = [
    { accessor: 'sn' as keyof LostItem, header: 'S.N.' },
    { accessor: 'item' as keyof LostItem, header: 'Item' },
    { accessor: 'lostLocation' as keyof LostItem, header: 'Lost Location' },
    { accessor: 'lostDate' as keyof LostItem, header: 'Lost Date' },
    { accessor: 'status' as keyof LostItem, header: 'Status' },
  ];

  const openAddModal = () => {
    setCurrentItem({ item: '', lostLocation: '', lostDate: '', status: ItemStatus.Pending });
    setIsModalOpen(true);
  };

  const handleEditItem = (item: LostItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = () => {
    if (!currentItem.item || !currentItem.lostLocation || !currentItem.lostDate) {
        alert('Please fill out all required fields.');
        return;
    }

    if (currentItem.sn) {
      // Edit logic
      setItems(items.map(i => i.sn === currentItem.sn ? { ...currentItem } as LostItem : i));
    } else {
      // Add logic
      const newId = items.length > 0 ? Math.max(...items.map(i => i.sn)) + 1 : 1;
      const newItem: LostItem = {
          sn: newId,
          item: currentItem.item,
          lostLocation: currentItem.lostLocation,
          lostDate: currentItem.lostDate,
          status: currentItem.status,
      };
      setItems([...items, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (itemToDelete: LostItem) => {
    if(window.confirm(`Are you sure you want to delete the record for ${itemToDelete.item}?`)){
       setItems(items.filter(item => item.sn !== itemToDelete.sn));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Manage Lost Items</h1>
      <DataTable
        columns={columns}
        data={items}
        onAdd={openAddModal}
        onEdit={handleEditItem}
        onDelete={handleDeleteItem}
        addLabel="Add Lost Item"
      />
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentItem.sn ? "Edit Lost Item" : "Add Lost Item"}
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
                <label htmlFor="lostLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lost Location</label>
                <input type="text" name="lostLocation" id="lostLocation" value={currentItem.lostLocation || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
                <label htmlFor="lostDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lost Date</label>
                <input type="date" name="lostDate" id="lostDate" value={currentItem.lostDate || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                <select name="status" id="status" value={currentItem.status} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                    {Object.values(ItemStatus).map(status => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default LostItemsPage;
