import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { TableLayout } from "../../components/tables/TableLayout"
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { TableDetailType } from "../../constant/TableDetailType";
import { useEffect, useState } from "react";
import CreateCategory from "./CreateCategory";
import CreateProduct from "./CreateProduct";
import { Modal, Table, Input, Select, Switch, Button, Checkbox, Pagination } from 'antd';
import ProductDetail from "./ProductDetail";

export const MenuPage = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(0);
    const [categoryWithProducts, setCategoryWithProducts] = useState([]);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [isAddCategoryModalVisible, setIsAddCategoryModalVisible] = useState(false);
    const [isAddProductModalVisible, setIsAddProductModalVisible] = useState(false);
    const [isProductDetailModalVisible, setIsProductDetailModalVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(false);
    
    const fetchCategoriesWithMenuItems = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://localhost:7087/api/food-types");
            const data = await response.json();
            setCategoryWithProducts(data);
            setCurrentProducts(data[0].menuItems);
        } catch (error) {
            console.error("There was an error!", error);
        } finally {
            setLoading(false);
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
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (text, record) => (
                <Select defaultValue={text}>
                    <Option value="Indian">Indian</Option>
                    <Option value="Chinese">Chinese</Option>
                    <Option value="Italian">Italian</Option>
                    <Option value="Mexican">Mexican</Option>
                    <Option value="Thai">Thai</Option>
                </Select>
            )
        },

        {
            title: 'In stock',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => a.quantity - b.quantity,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Variants',
            dataIndex: 'variations',
            key: 'variations',
            render: (text, record) => (
                <Select defaultValue={text}>
                    <Option value="Regular">Regular</Option>
                    <Option value="Spicy">Spicy</Option>
                    <Option value="Extra Serving">Extra Serving</Option>
                    <Option value="Extra Cream">Extra Cream</Option>
                    <Option value="Extra Spicy">Extra Spicy</Option>
                    <Option value="Extra Vegetables">Extra Vegetables</Option>
                </Select>
            )
        },
        {
            title: 'Available',
            dataIndex: 'state',
            key: 'state',
            sorter: (a, b) => a.state - b.state,
            render: (text, record) => <Switch defaultChecked={text === "Available"} />
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <Button onClick={() => setIsProductDetailModalVisible(true)} type="text"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
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
        fetchCategoriesWithMenuItems();
    }, []  );

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
                        <Input placeholder="Seach category" prefix={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        } />
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
                            {categoryWithProducts.map((category, index) => (
                                <li key={category.name} role="presentation">
                                    <button onClick={() => {
                                        setCurrentProducts(category.menuItems);
                                        setCurrentTab(index);
                                    }} className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTab === index ? 'border-amber-500 text-amber-500' : ''}`}>
                                        <span className="text-sm line-clamp-1">{category.typeOfFoodName}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex py-2 justify-end gap-x-4 px-4">
                        <div className="w-1/4">
                            <Input placeholder="Seach menu items" prefix={
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            } />
                        </div>
                        <Button className="text-black" onClick={setIsAddProductModalVisible} type="primary" icon={
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        }>
                            Add Menu Item
                        </Button>
                    </div>
                    <Table loading={loading || !currentProducts} pagination={false} rowKey={(record) => record.id} dataSource={currentProducts} columns={columnData} />
                </div>
                {currentProducts && <Pagination current={currentProducts.length} total={currentProducts.length} pageSize={rowsPerPage} onChange={handlePageChange} showSizeChanger={false} />}
            </div>
            <Modal title="Add New Category" open={isAddCategoryModalVisible} onCancel={() => setIsAddCategoryModalVisible(false)} footer={null}>
                <CreateCategory onSubmit={() => setIsAddCategoryModalVisible(false)} />
            </Modal>
            <Modal title="Add New Product" open={isAddProductModalVisible} onCancel={() => setIsAddProductModalVisible(false)} footer={null}>
                <CreateProduct onSubmit={() => setIsAddProductModalVisible(false)} />
            </Modal>
            <Modal title="Menu item detail" open={isProductDetailModalVisible} onCancel={() => setIsProductDetailModalVisible(false)} footer={null}>
                <ProductDetail />
            </Modal>
        </>
    )
}
