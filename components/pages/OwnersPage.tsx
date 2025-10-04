import React, { useState, useEffect } from 'react';
import DataTable from '../DataTable';
import { MOCK_OWNER_DETAILS } from '../../constants';
import type { OwnerDetails } from '../../types';

const OwnersPage: React.FC = () => {
    const [ownerDetails, setOwnerDetails] = useState<OwnerDetails[]>(() => {
      try {
        const saved = localStorage.getItem('ownerDetails');
        return saved ? JSON.parse(saved) : MOCK_OWNER_DETAILS;
      } catch (error) {
        console.error('Failed to parse owner details from localStorage', error);
        return MOCK_OWNER_DETAILS;
      }
    });

    useEffect(() => {
      localStorage.setItem('ownerDetails', JSON.stringify(ownerDetails));
    }, [ownerDetails]);

  const columns = [
    { accessor: 'sn' as keyof OwnerDetails, header: 'S.N.' },
    { accessor: 'registerNumber' as keyof OwnerDetails, header: 'Register Number' },
    { accessor: 'year' as keyof OwnerDetails, header: 'Year' },
    { accessor: 'dept' as keyof OwnerDetails, header: 'Department' },
  ];

  const handleAdd = () => alert('Add owner functionality to be implemented.');
  const handleEdit = (item: OwnerDetails) => alert(`Editing owner: ${item.registerNumber}`);
  const handleDelete = (itemToDelete: OwnerDetails) => {
    if(window.confirm(`Are you sure you want to delete owner ${itemToDelete.registerNumber}?`)){
        setOwnerDetails(ownerDetails.filter(item => item.sn !== itemToDelete.sn));
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Owner Details</h1>
      <DataTable
        columns={columns}
        data={ownerDetails}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        addLabel="Add Owner Detail"
      />
    </div>
  );
};

export default OwnersPage;