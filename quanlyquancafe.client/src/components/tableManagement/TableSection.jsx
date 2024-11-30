import React from 'react';
import TableCard from './TableCard';

const TableSection = ({ title, tables }) => {
  return (
    <div>
      
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="grid grid-cols-3 gap-4">
        {tables.map((table) => (
          <TableCard key={table.id} id={table.id} seats={table.seats} status={table.status} />
        ))}
      </div>
    </div>
  );
};

export default TableSection;