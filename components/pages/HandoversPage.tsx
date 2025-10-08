
import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import Modal from '../Modal';
import { MOCK_HANDOVER_DETAILS } from '../../constants';
import type { HandoverDetails } from '../../types';

const HandoversPage: React.FC = () => {
  const [handoverDetails, setHandoverDetails] = useState<HandoverDetails[]>(() => {
    try {
      const saved = localStorage.getItem('handoverDetails');
      return saved ? JSON.parse(saved) : MOCK_HANDOVER_DETAILS;
    } catch (error) {
      console.error('Failed to parse handover details from localStorage', error);
      return MOCK_HANDOVER_DETAILS;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<Omit<HandoverDetails, 'sn'> & { sn?: number }>({ name: '', faculty: '', dept: '', cabinNo: '' });

  useEffect(() => {
    localStorage.setItem('handoverDetails', JSON.stringify(handoverDetails));
  }, [handoverDetails]);

  const columns = [
    { accessor: 'sn' as keyof HandoverDetails, header: 'S.N.' },
    { accessor: 'name' as keyof HandoverDetails, header: 'Name' },
    { accessor: 'faculty' as keyof HandoverDetails, header: 'Faculty' },
    { accessor: 'dept' as keyof HandoverDetails, header: 'Department' },
    { accessor: 'cabinNo' as keyof HandoverDetails, header: 'Cabin No.' },
  ];

  const openAddModal = () => {
    setCurrentItem({ name: '', faculty: '', dept: '', cabinNo: '' });
    setIsModalOpen(true);
  };

  const handleEdit = (item: HandoverDetails) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  };
  
  const handleSave = () => {
    if (!currentItem.name || !currentItem.faculty || !currentItem.dept || !currentItem.cabinNo) {
      alert('Please fill out all required fields.');
      return;
    }

    if (currentItem.sn) {
      // Edit logic
      setHandoverDetails(handoverDetails.map(i => i.sn === currentItem.sn ? { ...currentItem } as HandoverDetails : i));
    } else {
      // Add logic
      const newId = handoverDetails.length > 0 ? Math.max(...handoverDetails.map(i => i.sn)) + 1 : 1;
      const newItem: HandoverDetails = {
        sn: newId,
        name: currentItem.name,
        faculty: currentItem.faculty,
        dept: currentItem.dept,
        cabinNo: currentItem.cabinNo,
      };
      setHandoverDetails([...handoverDetails, newItem]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (itemToDelete: HandoverDetails) => {
    if(window.confirm(`Are you sure you want to delete handover record for ${itemToDelete.name}?`)){
        setHandoverDetails(handoverDetails.filter(item => item.sn !== itemToDelete.sn));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Handover Details</h1>
      <DataTable
        columns={columns}
        data={handoverDetails}
        onAdd={openAddModal}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addLabel="Add Handover Detail"
      />
       <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={currentItem.sn ? "Edit Handover Detail" : "Add Handover Detail"}
        footer={
            <>
                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">Save Detail</button>
            </>
        }
      >
        <form className="space-y-4">
            <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                <input type="text" name="name" id="name" value={currentItem.name || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
                <label htmlFor="faculty" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Faculty</label>
                <input type="text" name="faculty" id="faculty" value={currentItem.faculty || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
                <label htmlFor="dept" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
                <input type="text" name="dept" id="dept" value={currentItem.dept || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
                <label htmlFor="cabinNo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cabin No.</label>
                <input type="text" name="cabinNo" id="cabinNo" value={currentItem.cabinNo || ''} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
            </div>
        </form>
      </Modal>
    </div>
  );
};

export default HandoversPage;
