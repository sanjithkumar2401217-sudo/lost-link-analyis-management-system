import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
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

  const handleAdd = () => alert('Add handover functionality to be implemented.');
  const handleEdit = (item: HandoverDetails) => alert(`Editing handover: ${item.name}`);
  const handleDelete = (itemToDelete: HandoverDetails) => {
    if(window.confirm(`Are you sure you want to delete handover record for ${itemToDelete.name}?`)){
        setHandoverDetails(handoverDetails.filter(item => item.sn !== itemToDelete.sn));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Handover Details</h1>
      <DataTable
        columns={columns}
        data={handoverDetails}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addLabel="Add Handover Detail"
      />
    </div>
  );
};

export default HandoversPage;