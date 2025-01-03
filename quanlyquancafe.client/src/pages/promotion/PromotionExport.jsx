import React from 'react';
import { CSVLink } from 'react-csv';
import { Button, DatePicker } from 'antd';
import { useEffect } from 'react';

const PromotionExport = ({ promotions }) => {
    const [filteredData, setFilteredData] = React.useState([]);
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);

    const headers = [
        { label: 'Promotion ID', key: 'voucherId' },
        { label: 'Promotion Name', key: 'voucherName' },
        { label: 'Start Date', key: 'voucherStartDate' },
        { label: 'End Date', key: 'voucherEndDate' },
        { label: 'Discount', key: 'percentDiscount' },
        { label: 'Point Requires', key: 'pointRequired' },
        { label: 'Min Order Amount', key: 'minOrderAmount' },
    ];

    const data = promotions.map(promotion => ({
        voucherId: promotion.voucherId,
        voucherName: promotion.voucherName,
        voucherStartDate: promotion.voucherStartDate,
        voucherEndDate: promotion.voucherEndDate,
        percentDiscount: promotion.percentDiscount,
        pointRequired: promotion.pointRequired,
        minOrderAmount: promotion.minOrderAmount,
    }));

    const handleTimeChange = () => {
        if (startDate && endDate) {
            const filteredData = data.filter(promotion => {
                const voucherStartDate = new Date(promotion.voucherStartDate);
                const voucherEndDate = new Date(promotion.voucherEndDate);
                return voucherStartDate >= startDate && voucherEndDate <= endDate;
            });
            setFilteredData(filteredData);
        } else {
            setFilteredData(data);
        }
    }

    useEffect(() => {
        handleTimeChange();
    }, [startDate, endDate]);

    return (
        <div className='flex flex-col gap-y-4 p-4'>
            <div className='flex gap-x-2 items-center justify-between'>
                <div className='flex gap-x-2 items-center'>
                    <p>Start time</p>
                    <DatePicker onCalendarChange={(date) => setStartDate(date)} />
                </div>
                <div className='flex gap-x-2 items-center'>
                    <p>End time</p>
                    <DatePicker onCalendarChange={(date) => setEndDate(date)} />
                </div>
            </div>
            <Button>
                <CSVLink data={filteredData} headers={headers} filename="promotions.csv">
                    Export to CSV
                </CSVLink>
            </Button>
        </div>
    );
};

export default PromotionExport;
