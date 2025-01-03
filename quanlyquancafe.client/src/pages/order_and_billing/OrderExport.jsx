import React from 'react';
import { CSVLink } from 'react-csv';
import { Button, DatePicker } from 'antd';
import { useEffect } from 'react';

const OrderExport = ({orders}) => {
    const [filteredData, setFilteredData] = React.useState([]);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const headers = [
        { label: 'Order ID', key: 'id' },
        { label: 'Customer Name', key: 'customerName' },
        { label: 'Order Time', key: 'orderTime' },
        { label: 'Payment Method', key: 'PaymentMethod' },
        { label: 'Order Details', key: 'orderDetails' },
        { label: 'Order Status', key: 'orderState' },
        { label: 'Total Price', key: 'totalPrice' },
    ];

    const data = orders.map(order => ({
        id: order.orderId,
        customerName: order.user?.fullName || 'Guest',
        orderTime: new Date(order.orderTime).toLocaleString(), 
        PaymentMethod: order.paymentMethod, 
        orderDetails: order.orderDetails.map(detail => `${detail.item.itemName} x ${detail.quantity}`).join(', '),
        orderState: order.orderState,
        totalPrice: order.totalPrice,
    }));

    const handleTimeChange = () => {
        if (startDate && endDate) {
            const filteredData = data.filter(order => {
                const orderTime = new Date(order.orderTime);
                return orderTime >= startDate && orderTime <= endDate;
            });
            setFilteredData(filteredData);
        } else {
            setFilteredData(data);
        }
    }

    useEffect(() => {
        handleTimeChange();
    }, [startDate, endDate])

    return (
        <div className='flex flex-col gap-y-4 p-4'>
            <div className='flex gap-x-2 items-center justify-between'>
            <div className='flex gap-x-2 items-center'>
                <p>Start time</p>
            <DatePicker  onCalendarChange={(date) => setStartDate(date)}/>
            </div>
            <div className='flex gap-x-2 items-center'>
                <p>End time</p>
            <DatePicker  onCalendarChange={(date)=> setEndDate(date)}/>
            </div>
            </div>
            
            
            <Button >
            <CSVLink data={filteredData} headers={headers} filename="orders.csv">
                Export to CSV
            </CSVLink>
            </Button>
        </div>
    );
};

export default OrderExport;