import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { TableLayout } from "../../components/tables/TableLayout"
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { TableDetailType } from "../../constant/TableDetailType";
import { useState } from "react";

export const InventoryControlPage = () => {
    const navigate = useNavigate();
    const [currentTab1, setCurrentTab1] = useState(0);

    const sampleData = [
        {
            id: "P001",
            name: "Carrot",
            stock: 5,
            dom: "Kgs",
            status: "In Stock",
            action: "Edit"
        },
        {
            id: "P002",
            name: "Tomato",
            stock: 4,
            dom: ["Kgs", "Meat/Seafood", "Dairy Products"],
            status: "Out of Stock",
            action: "Edit"
        },
        {
            id: "P003",
            name: "Carrot",
            stock: 5,
            dom: "Kgs",
            status: "Low Stock",
            action: "Edit"
        },
        {
            id: "P004",
            name: "Carrot",
            stock: 5,
            dom: "Kgs",
            status: "In Stock",
            action: "Edit"
        },
        {
            id: "P005",
            name: "Carrot",
            stock: 5,
            dom: "Kgs",
            status: "Low Stock",
            action: "Edit"
        },
       
    ];


    const categories2 = [
        {name: "Row Materials"},
        {name: "Purchase Order"}
    ]   



    const columnData = [
        { header: "", key: "id", type: TableDetailType.CheckBox },
        { header: "Item Code", key: "id", type: TableDetailType.Info },
        { header: "Item Name", key: "name", type: TableDetailType.Info },
        { header: "Stock Left", key: "stock", type: TableDetailType.Info },
        { header: "DOM", key: "dom", type: TableDetailType.ComboBox, options: [
            { value: "Kgs", label: "Kgs" }] },
        { header: "Stock Status", key: "status", type: TableDetailType.Badge },
        { header: "", key: "action", type: TableDetailType.Action }
    ];

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center flex gap-x-10">
                <h2 className="text-amber-500 font-medium text-3xl">Inventory Control</h2>

                <div className="mr-auto border-black-200 rounded-lg bg-black-600/30 flex gap-x-4" >
                    <ul
                        className="flex gap-x-6 -mb-px text-sm  text-center max-w-full overflow-x-auto"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-content"
                        role="tablist"
                    >
                        {categories2.map((tab, index) => (
                            <li key={tab.name} role="presentation">
                                <button
                                    onClick={() => {

                                        setCurrentTab1(index);
                                    }}
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTab1 === index ? 'border-amber-500 text-amber-500' : ''
                                        }`}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-x-2">

                    <RoundedButton prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    } height="40px" label="Export Inventory Report" />

                </div>
            </div>
           
            <div className=" max-h-[calc(100vh-250px)] bg-amber-200/20  min-h-[calc(100vh-250px)]">
                
                <div className="flex py-2 justify-end gap-x-4 px-4">
                <RoundedTextField
                        textColor="text-gray-500"
                        placeholder="Search Item..."
                        height="30px"
                        width="250px"
                        prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        } />

                    <RoundedButton onClick={() => navigate("/inventory/add")} prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    }
                        height="30px"
                        label="Add new Item" />
                </div>
                <TableLayout
                pageLayout={false}
                    columns={columnData}
                    data={sampleData}
                />
            </div>
            


        </div>
    )
}