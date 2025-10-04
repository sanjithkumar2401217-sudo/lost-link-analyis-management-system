
import React, { useState, useMemo } from 'react';
import { SearchIcon, EditIcon, DeleteIcon } from './icons';

interface Column<T> {
  accessor: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  addLabel: string;
}

const DataTable = <T extends { [key: string]: any }>(
    { columns, data, onAdd, onEdit, onDelete, addLabel }: DataTableProps<T>
) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(item =>
      columns.some(column => {
        const value = item[column.accessor];
        return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, columns]);
  
  const getStatusClass = (status: string) => {
    switch (status) {
        case 'Pending':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'Found':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
        case 'Claimed':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };


  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <div className="relative w-full sm:w-auto mb-4 sm:mb-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="w-5 h-5 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg dark:text-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={onAdd}
          className="w-full sm:w-auto px-4 py-2 font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          {addLabel}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.header}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {col.header}
                </th>
              ))}
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                {columns.map((col) => (
                  <td key={String(col.accessor)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                    {col.accessor === 'status' ? (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(String(item[col.accessor]))}`}>
                            {String(item[col.accessor])}
                        </span>
                    ) : (
                      col.render ? col.render(item) : String(item[col.accessor])
                    )}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-4">
                    <button onClick={() => onEdit(item)} className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-200">
                      <EditIcon />
                    </button>
                    <button onClick={() => onDelete(item)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200">
                      <DeleteIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
         {filteredData.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                No records found.
            </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
