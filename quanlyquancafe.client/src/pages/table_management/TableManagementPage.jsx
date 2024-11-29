import React from "react";
import  TableSection  from "../../components/tableManagement/TableSection";

const tables = [
  { id: 'T1', area: 'Indoor', seats: 2, status: 'available' },
  { id: 'T2', area: 'Indoor', seats: 2, status: 'available' },
  { id: 'T3', area: 'Indoor', seats: 2, status: 'occupied' },
  { id: 'T4', area: 'Indoor', seats: 4, status: 'occupied' },
  { id: 'T5', area: 'Indoor', seats: 4, status: 'available' },
  { id: 'T6', area: 'Indoor', seats: 6, status: 'available' },
  { id: 'T7', area: 'Indoor', seats: 8, status: 'occupied' },
  { id: 'T8', area: 'Indoor', seats: 12, status: 'occupied' },
  { id: 'T9', area: 'Garden', seats: 4, status: 'available' },
  { id: 'T10', area: 'Garden', seats: 4, status: 'occupied' },
  { id: 'T11', area: 'Garden', seats: 4, status: 'available' },
  { id: 'T12', area: 'Garden', seats: 4, status: 'available' },
  { id: 'T13', area: 'Garden', seats: 8, status: 'available' },
  { id: 'T14', area: 'Garden', seats: 8, status: 'occupied' },
];

export const TableManagementPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-yellow-300 p-5">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Table Management</h1>
        <button className="bg-yellow-300 text-gray-900 px-4 py-2 rounded">+ Add New Table</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <TableSection
          title="Indoor"
          tables={tables.filter((table) => table.area === 'Indoor')}
        />
        <TableSection
          title="Garden Area"
          tables={tables.filter((table) => table.area === 'Garden')}
        />
      </div>
    </div>
  );
};

export default TableManagementPage;