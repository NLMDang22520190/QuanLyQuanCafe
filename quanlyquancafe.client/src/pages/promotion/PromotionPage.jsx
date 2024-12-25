import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RoundedButton } from "../../components/buttons/RoundedButton";
import { TableLayout } from "../../components/tables/TableLayout";
import { RoundedTextField } from "../../components/textfields/RoundedTextField";
import { TableDetailType } from "../../constant/TableDetailType";
import { useState, useEffect } from "react";
import { filterData } from "../../utils/FilterUtil";
import { Modal, Button, Table, Checkbox } from 'antd'
import {AddPromotion} from './AddPromotion';
import { StatusBadge } from "../../components/badges/StatusBadge";
import { PromotionDetail } from "./PromotionDetail";

export const PromotionPage = () => {
    const navigate = useNavigate();
    const [searchQuerry, setSearchQuerry] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [isModalAddVisible, setIsModalAddVisible] = useState(false);
    const [isPromotionDetailModalVisible, setIsPromotionDetailModalVisible] = useState(false);
    const [vouchers, setVouchers] = useState([]);

    const columns = [
        {
            title: 'Promotion ID',
            dataIndex: 'voucherId',
            key: 'voucherId',
            render: (text, record) => {
                return <Checkbox>{text}</Checkbox>;
            }
        },
        {
            title: 'Code',
            dataIndex: 'voucherCode',
            key: 'voucherCode', 
        },
        {
            title: 'Name',
            dataIndex: 'voucherName',
            key: 'voucherName', 
        },
        {
            title: 'Start Date',
            dataIndex: 'voucherStartDate',
            key: 'voucherStartDate',
        },
        {
            title: 'End Date',
            dataIndex: 'voucherEndDate',
            key: 'voucherEndDate',
        },
        {
            title: 'Discount',
            dataIndex: 'percentDiscount',
            key: 'percentDiscount',
            render: (text, record) => {
                return <span>{text}%</span>
            }
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
        //     render: (text, record) => {
        //         return <StatusBadge  status={text} label={text} />
        //     }
        // },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => <Button onClick={() => setIsPromotionDetailModalVisible(true)} type="text"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            </Button>
        },
    ];

    const apiUrl = "https://localhost:7087/api/voucher-details";

    const fetchVouchers = async () => {
        axios.get(apiUrl)
    .then(response => {
        setVouchers(response.data);
        console.log(response.data);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
    }


    useEffect(() => {
        setFilteredData(filterData(vouchers, searchQuerry));
    }, [searchQuerry]);

    useEffect(() => {
        fetchVouchers();
    }, []);

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
                    <Table columns={columns} dataSource={vouchers} />
                </div>
            </div>
            <Modal title="Add New Promotion" open={isModalAddVisible} onCancel={() => setIsModalAddVisible(false)} footer={null}>
               <AddPromotion onSubmit={()=>setIsModalAddVisible(false)}/>
            </Modal>
            <Modal title="Promotion detail" open={isPromotionDetailModalVisible} onCancel={() => setIsPromotionDetailModalVisible(false)} footer={null}>
            <PromotionDetail />
        </Modal>
        </>
    );
};
