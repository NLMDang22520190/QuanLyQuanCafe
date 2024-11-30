import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton";
import { TableLayout } from "../../components/tables/TableLayout";
import { RoundedTextField } from "../../components/textfields/RoundedTextField";
import { TableDetailType } from "../../constant/TableDetailType";
import { useState, useEffect } from "react";
import { filterData } from "../../utils/FilterUtil";
import { Modal, Input, TimePicker, DatePicker } from 'antd'
import {AddPromotion} from './AddPromotion';

export const PromotionPage = () => {
    const navigate = useNavigate();
    const [searchQuerry, setSearchQuerry] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);

    const sampleData = [
        {
            id: "PROMO001",
            name: "Black Friday Sale",
            startDate: "2024-11-25",
            endDate: "2024-11-30",
            discount: "50%",
            status: "Active",
            action: "View Details",
        },
        {
            id: "PROMO002",
            name: "Christmas Sale",
            startDate: "2024-12-20",
            endDate: "2024-12-25",
            discount: "30%",
            status: "Upcoming",
            action: "View Details",
        },
        {
            id: "PROMO003",
            name: "New Year Sale",
            startDate: "2025-01-01",
            endDate: "2025-01-05",
            discount: "20%",
            status: "Upcoming",
            action: "View Details",
        },
        {
            id: "PROMO004",
            name: "Valentine's Day Sale",
            startDate: "2025-02-10",
            endDate: "2025-02-14",
            discount: "25%",
            status: "Upcoming",
            action: "View Details",
        },
        {
            id: "PROMO005",
            name: "Summer Sale",
            startDate: "2025-06-01",
            endDate: "2025-06-10",
            discount: "40%",
            status: "Inactive",
            action: "View Details",
        },
    ];

    const columnData = [
        { header: "", key: "id", type: TableDetailType.CheckBox },
        { header: "Promotion ID", key: "id", type: TableDetailType.Info },
        { header: "Name", key: "name", type: TableDetailType.Info },
        { header: "Start Date", key: "startDate", type: TableDetailType.Info },
        { header: "End Date", key: "endDate", type: TableDetailType.Info },
        { header: "Discount", key: "discount", type: TableDetailType.Info },
        { header: "Status", key: "status", type: TableDetailType.Badge },
        { header: "", key: "action", type: TableDetailType.Action, actions: [{ label: "Edit" }] },
    ];



    useEffect(() => {
        setFilteredData(filterData(sampleData, searchQuerry));
    }, [searchQuerry]);

    return (
        <>
            <div className="flex flex-col gap-y-4 overflow-hidden h-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-amber-500 font-medium text-3xl">Promotions</h2>
                    <div className="flex gap-x-2">
                        <RoundedTextField
                            onValueChange={(value) => setSearchQuerry(value)}
                            textColor="text-gray-500"
                            placeholder="Search promotion..."
                            height="40px"
                            width="250px"
                            prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>}
                        />
                        <RoundedButton prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>}
                            height="40px" label="Export Promotion Report" />
                        <RoundedButton onClick={() => setIsModalAddVisible(true)} prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>}
                            height="40px"
                            label="Create New Promotion" />
                    </div>
                </div>
                <div className="max-h-[calc(100vh-200px)] min-h-[calc(100vh-200px)]">
                    <TableLayout
                        columns={columnData}
                        data={filteredData}
                    />
                </div>
            </div>
            <Modal title="Add New Promotion" open={isModalAddVisible} onCancel={() => setIsModalAddVisible(false)}>
               <AddPromotion />

            </Modal>
        </>
    );
};
