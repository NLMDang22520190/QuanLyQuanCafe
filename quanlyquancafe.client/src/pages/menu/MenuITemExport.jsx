import React from 'react';
import { CSVLink } from 'react-csv';

const MenuItemExport = ({ menuItems }) => {
    const headers = [
        { label: 'ID', key: 'itemId' },
        { label: 'Name', key: 'itemNam' },
        { label: 'Price', key: 'price' },
        { label: 'Category', key: 'category' }
    ];

    return (
        <div>
            <CSVLink data={menuItems} headers={headers} filename="menu_items.csv">
                Export to CSV
            </CSVLink>
        </div>
    );
};

export default MenuItemExport;