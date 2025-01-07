import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton";
import { Modal, Table, Input, Select, Switch, Button, Checkbox, Pagination } from 'antd';
import { RoundedTextField } from "../../components/textfields/RoundedTextField";
import instance from "../../features/AxiosInstance/AxiosInstance";
import axios from "axios";
import { useEffect, useState } from "react";
import { StatusBadge } from "../../components/badges/StatusBadge";
import AddMaterials from "./AddMaterials";
import IngredientDetail from "./IngredientDetail";

export const InventoryControlPage = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [rowMaterialsData, setRowMaterialsData] = useState([]);
    const [importRecordsData, setImportRecordsData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentTab, setCurrentTab] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const [totalItems, setTotalItems] = useState(0);
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);
    const [isIngredientDetailVisible, setIsIngredientDetailVisible] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);


    const rowMaterialColumns = [
        {

            title: "Item Code",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Item Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Stock Left",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "DOM",
            dataIndex: "dom",
            key: "dom",
        },
        {
            title: "Stock Status",
            dataIndex: "status",
            key: "status",
            render: (text) => <StatusBadge status={text} label={text} />,
        },
        {
            title: '',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => <Button
            onClick={() => {
                console.log("Selected Record:", record);
              if (record.id) {
                setSelectedIngredient(record);
                setIsIngredientDetailVisible(true);
              } else {
                message.error("Nguyên liệu không hợp lệ.");
              }
            }}
            type="text"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </Button>
        }
    ];

   
    const importRecordColumns = [
        {
            title: "Import Record ID",
            dataIndex: "importRecordId",
            key: "importRecordId",
        },
        {
            title: "Ingredient Name", 
            dataIndex: "ingredientName", 
            key: "ingredientName",
        },
        {
            title: "Date Import",
            dataIndex: "dateImport",
            key: "dateImport",
        },
        {
            title: "Quantity Import",
            dataIndex: "quantityImport",
            key: "quantityImport",
        },
        {
            title: "Import Price",
            dataIndex: "importPrice",
            key: "importPrice",
        },
        
    ];

   
    const fetchRowMaterials = async () => {
        try {
            const response = await instance.get(`/api/ingredient`);

            const items = response.data || [];
            const ingredients = items.map((item) => ({
                id: item.ingredientId,
                name: item.ingredientName,
                stock: item.quantityInStock,
                dom: item.unit,
                status: item.quantityInStock > 0 ? "In Stock" : "Out of Stock",
            }));
    
            setRowMaterialsData(ingredients); 
            setTotalItems(ingredients.length); 
        } catch (error) {
            console.error("Failed to fetch ingredients", error);
        }
    };
    
    
    

    
    const fetchImportRecords = async (page = 1, size = 5) => {
        try {
            const ingredientsResponse = await instance.get(`/api/ingredient`);
            const ingredientMapping = ingredientsResponse.data.reduce((map, item) => {
                map[item.ingredientId] = item.ingredientName;
                return map;
            }, {});
    
          
            const importRecordsResponse = await instance.get(`/api/import-record`, {
                params: {page, pageSize: size},
            });
            const { items, total } = importRecordsResponse.data;
            const records = importRecordsResponse.data.map((record) => ({
                importRecordId: record.importRecordId,
                ingredientId: record.ingredientId,
                ingredientName: ingredientMapping[record.ingredientId] || "Unknown", 
                dateImport: record.dateImport,
                quantityImport: record.quantityImport,
                importPrice: record.importPrice,
            }));
            setImportRecordsData(records);
            setTotalItems(total);
        } catch (error) {
            console.error("Failed to fetch import records or ingredients", error);
        }
    };
    
  
    useEffect(() => {
        if (currentTab === 0) {
            fetchRowMaterials();
        } else if (currentTab === 1) {
            fetchImportRecords(currentPage, pageSize);
        }
    }, [currentTab]);

    useEffect(() => {
        if (currentTab === 0) {
            const filtered = rowMaterialsData.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            setFilteredData(filtered.slice(startIndex, endIndex));
            setTotalItems(filtered.length);
        } else if (currentTab === 1) {
            setFilteredData(importRecordsData);
        }
    }, [searchQuery, currentPage, pageSize, currentTab, rowMaterialsData, importRecordsData]);


    const categories = [
        { name: "Row Materials" },
        { name: "Import Records" },
    ];

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            {/* Header Section */}
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Inventory Control</h2>
                <div className="mr-auto border-black-200 rounded-lg bg-black-600/30 flex gap-x-4">
                    {/* Tab Navigation */}
                    <ul className="flex gap-x-6 -mb-px text-sm text-center max-w-full overflow-x-auto">
                        {categories.map((tab, index) => (
                            <li key={tab.name} role="presentation">
                                <button
                                    onClick={() => {setCurrentTab(index);  setCurrentPage(1);}}
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                                        currentTab === index ? "border-amber-500 text-amber-500" : ""
                                    }`}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-x-2">

             
                    <RoundedTextField
                        onValueChange={(value) => setSearchQuery(value)}
                        textColor="text-gray-500"
                        placeholder="Search Item..."
                        height="40px"
                        width="250px"
                        prefixIcon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                />
                            </svg>
                        }
                    />
       
                    <RoundedButton
                        height="40px"
                        label="Export Inventory Report"
                    />
                    <RoundedButton
                        onClick={() => setIsAddModalVisible(true)}
                        height="40px"
                        label="Add New Item"
                    />
                </div>
            </div>
    
            <div className="max-h-[calc(100vh-200px)] min-h-[calc(100vh-200px)]">
            <Table
                    columns={currentTab === 0 ? rowMaterialColumns : importRecordColumns}
                    dataSource={filteredData}
                    rowKey={currentTab === 0 ? "id" : "importRecordId"}
                    pagination={{
                        current: currentPage,
                        pageSize,
                        total: totalItems,
                        onChange: (page, size) => {
                            setCurrentPage(page);
                            setPageSize(size);
                        },
                    }}
                />
            </div>
            {isAddModalVisible && (
                <AddMaterials
                    visible={isAddModalVisible}
                    onClose={() => setIsAddModalVisible(false)}
                />
            )}

            {isIngredientDetailVisible && selectedIngredient && (
                <IngredientDetail
                    visible={isIngredientDetailVisible}
                    ingredientId={selectedIngredient?.id}
                    onClose={() => setIsIngredientDetailVisible(false)}
                />
            )}
        </div>
    );
};