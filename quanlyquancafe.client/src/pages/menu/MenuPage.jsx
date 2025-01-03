import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";
import { Modal, Table, Input, Select, Switch, Button, Checkbox, Pagination, message } from 'antd';
import ProductDetail from "./ProductDetail";
import axios from "axios";
import api from "../../features/AxiosInstance/AxiosInstance";

export const MenuPage = () => {
    const navigate = useNavigate();
    const [currentTypeOfFoodId, setCurrentTypeOfFoodId] = useState(0);
    const [menuItems, setMenuItems] = useState([]);
    const [currentMenuItems, setCurrentMenuItems] = useState([]);
    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
    const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
    const [isProductDetailModalVisible, setIsProductDetailModalVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [typeOfFoods, setTypeOfFoods] = useState([]);   
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    const [availabilityLoading, setAvailabilityLoading] = useState(null);

    const fetchMenuItems = async () => {
        setLoading(true);
        axios.get('https://localhost:7087/api/menu-items').then(response => {
            const data = response.data;
            setMenuItems(data);
        }).catch(error => {}).finally(() => setLoading(false));
    }

    const fetchTypeOfFoods = async () => {
        try {
            const response = await axios.get('https://localhost:7087/api/food-types');
            const data = await response.data;
            setTypeOfFoods(data);
            setCurrentTypeOfFoodId(data[0].typeOfFoodId);
        } catch (error) {
            console.log(error.message);
        }
    }

    const changeProductState = async (id) => {
        setAvailabilityLoading(id);
        try {
            const response = await api.put(`api/menu-items/${id}/change-availability`);
            const data = response.data;
            message.success(data);
        } catch (error) {
            message.error('Failed to change product status');
        } finally {
            setAvailabilityLoading(null);
         }

    }

    const columnData = [
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (text, record) => <Checkbox />
        },
        {
            title: 'Name',
            dataIndex: 'itemName',
            key: 'name',
            sorter: (a, b) => a.itemName.localeCompare(b.itemName),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${parseFloat(text).toFixed(2)}`,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Available',
            dataIndex: 'state',
            key: 'state',
            sorter: (a, b) => a.state - b.state,
            render: (text, record) => <Switch loading={availabilityLoading == record.itemId} defaultChecked={text === "Available"} onChange={()=>changeProductState(record.itemId)} />
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <Button onClick={() => {setIsProductDetailModalVisible(true), setSelectedProductId( record.itemId )}} type="text"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            </Button>
        }
    ];

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setRowsPerPage(pageSize);
    };

    useEffect(() => { 
        fetchTypeOfFoods();
        fetchMenuItems();
    }, []  );

    useEffect(() => {
        if (menuItems.length > 0) {
           setCurrentMenuItems(menuItems.filter(item => item.typeOfFoodId === currentTypeOfFoodId));
        }   
    }, [currentTypeOfFoodId, menuItems]);   

    const onSearchMenuItem = (value) => {
        const filteredMenuItems = menuItems.filter(item => item.itemName.toLowerCase().includes(value.toLowerCase()));
        setCurrentMenuItems(filteredMenuItems);
    }

    const onSearchCategories = (value) => {
        const filteredTypeOfFoods = typeOfFoods.filter(type => type.typeOfFoodName.toLowerCase().includes(value.toLowerCase()));
        setTypeOfFoods(filteredTypeOfFoods);
    }

    return (
        <>
            <div className="flex flex-col gap-y-4 overflow-hidden h-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-amber-500 font-medium text-3xl">Menu Management</h2>
                    <div className="flex gap-x-2">
                        <Button className="text-black" size="large" type="primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg> Export Menu Report
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between">
                    <p className="text-2xl items-center">Categories</p>
                    <div className="flex gap-x-4">
                        <Input.Search onSearch={onSearchCategories} placeholder="Seach category" prefix={" "} />
                        <Button className="text-black" onClick={setIsAddCategoryModalVisible} icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        } type="primary">
                            Add new Category
                        </Button>
                    </div>
                </div>
                <div className="max-h-[calc(100vh-300px)] bg-amber-200/20 min-h-[calc(100vh-300px)]">
                    <div className="border-gray-200 rounded-lg bg-gray-900">
                        <ul className="flex gap-x-2 -mb-px text-sm text-center max-w-full overflow-x-auto" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                            {typeOfFoods.map((type) => (
                                <li key={type.typeOfFoodName} role="presentation">
                                    <button onClick={() => {
                                        setCurrentTypeOfFoodId(type.typeOfFoodId);
                                    }} className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTypeOfFoodId === type.typeOfFoodId ? 'border-amber-500 text-amber-500' : ''}`}>
                                        <span className="text-sm line-clamp-1">{type.typeOfFoodName}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex py-2 justify-end gap-x-4 px-4">
                        <div className="w-1/4">
                            <Input.Search placeholder="Seach menu items" onSearch={onSearchMenuItem} prefix={" "} />
                        </div>
                        <Button className="text-black" onClick={setIsAddProductModalVisible} type="primary" icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        }>
                            Add Menu Item
                        </Button>
                    </div>
                    <Table loading={loading || !currentMenuItems} pagination={false} rowKey={(record) => record.id} dataSource={currentMenuItems} columns={columnData} />
                </div>
                {currentMenuItems && <Pagination current={currentMenuItems.length} total={currentMenuItems.length} pageSize={rowsPerPage} onChange={handlePageChange} showSizeChanger={false} />}
            </div>
            <Modal title="Add New Category" open={isAddCategoryModalVisible} onCancel={() => setIsAddCategoryModalVisible(false)} footer={null}>
                <CreateCategory onSubmit={() => setIsAddCategoryModalVisible(false)} />
            </Modal>
            <Modal title="Add New Product" open={isAddProductModalVisible} onCancel={() => setIsAddProductModalVisible(false)} footer={null}>
                <CreateProduct onSubmit={() => setIsAddProductModalVisible(false)} />
            </Modal>
            <Modal title="Menu item detail" open={isProductDetailModalVisible} onCancel={() => {setIsProductDetailModalVisible(false), setSelectedProductId(null)}} footer={null}>
                {
                    selectedProductId && <ProductDetail id={selectedProductId} onSubmit={() => {setIsProductDetailModalVisible(false), setSelectedProductId(null)}} />
                }
            </Modal>
        </>
    )
}
