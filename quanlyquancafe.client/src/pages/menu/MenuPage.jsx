import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { TableLayout } from "../../components/tables/TableLayout"
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { TableDetailType } from "../../constant/TableDetailType";
import { useState } from "react";

export const MenuPage = () => {
    const navigate = useNavigate();
    const [currentTab, setCurrentTab] = useState(0);

    const sampleData = [
        {
            id: 1,
            name: "Paneer Tikka Biryani",
            category: "Indian",
            price: "$12.99",
            quantity: 50,
            description: "A spicy and aromatic rice dish with paneer tikka.",
            variations: ["Regular", "Spicy", "Extra Serving"],
            available: true,
            action: "Edit"
        },
        {
            id: 2,
            name: "Boneless Chicken 65",
            category: "Chinese",
            price: "$10.99",
            quantity: 30,
            description: "A crispy, boneless chicken dish, popular in Chinese cuisine.",
            variations: ["Small", "Large", "Extra Spicy"],
            available: true,
            action: "Edit"
        },
        {
            id: 3,
            name: "Chicken Boneless Biryani",
            category: "Indian",
            price: "$14.49",
            quantity: 60,
            description: "Fragrant rice cooked with boneless chicken and spices.",
            variations: ["Regular", "Spicy", "Extra Serving"],
            available: true,
            action: "Edit"
        },
        {
            id: 4,
            name: "Veg Fried Rice",
            category: "Chinese",
            price: "$8.99",
            quantity: 40,
            description: "A stir-fried rice dish with mixed vegetables.",
            variations: ["Small", "Large", "Extra Vegetables"],
            available: false,
            action: "Edit"
        },
        {
            id: 5,
            name: "Butter Chicken",
            category: "Indian",
            price: "$15.99",
            quantity: 20,
            description: "A creamy chicken curry served with naan or rice.",
            variations: ["Regular", "Spicy", "Extra Cream"],
            available: false,
            action: "Edit"
        },
        {
            id: 5,
            name: "Butter Chicken",
            category: "Indian",
            price: "$15.99",
            quantity: 20,
            description: "A creamy chicken curry served with naan or rice.",
            variations: ["Regular", "Spicy", "Extra Cream"],
            available: true,
            action: "Edit"
        },
        {
            id: 5,
            name: "Butter Chicken",
            category: "Indian",
            price: "$15.99",
            quantity: 20,
            description: "A creamy chicken curry served with naan or rice.",
            variations: ["Regular", "Spicy", "Extra Cream"],
            available: false,
            action: "Edit"
        },
        {
            id: 5,
            name: "Butter Chicken",
            category: "Indian",
            price: "$15.99",
            quantity: 20,
            description: "A creamy chicken curry served with naan or rice.",
            variations: ["Regular", "Spicy", "Extra Cream"],
            available: true,
            action: "Edit"
        },
        {
            id: 5,
            name: "Butter Chicken",
            category: "Indian",
            price: "$15.99",
            quantity: 20,
            description: "A creamy chicken curry served with naan or rice.",
            variations: ["Regular", "Spicy", "Extra Cream"],
            available: true,
            action: "Edit"
        }
    ];

    const categories = [
        { name: "All" },
        { name: "Biryani" },
        { name: "Bervarage" },
    ]




    const columnData = [
        { header: "", key: "id", type: TableDetailType.CheckBox },
        { header: "Name", key: "name", type: TableDetailType.TextField },
        { header: "Category", key: "category", type: TableDetailType.ComboBox },
        { header: "Price", key: "price", type: TableDetailType.TextField },
        { header: "Quantity", key: "quantity", type: TableDetailType.TextField },
        { header: "Description", key: "description", type: TableDetailType.TextField },
        { header: "Variants", key: "variations", type: TableDetailType.ComboBox },
          { header: "Available", key: "available", type: TableDetailType.CheckSlider },
        { header: "", key: "action", type: TableDetailType.Action }
    ];

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Menu Management</h2>
                <div className="flex gap-x-2">

                    <RoundedButton prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    } height="40px" label="Export Menu Report" />

                </div>
            </div>
            <div className="flex justify-between">
                <p className="text-2xl items-center">Categories</p>
                <div className="flex gap-x-4">
                    <RoundedTextField
                        textColor="text-gray-500"
                        placeholder="Search category..."
                        height="30px"
                        width="250px"
                        prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        } />

                    <RoundedButton onClick={() => navigate("/orderAndBilling/create")} prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    }
                        height="30px"
                        label="Create new Category" />

                </div>

            </div>
            <div className=" max-h-[calc(100vh-250px)] bg-amber-200/20  min-h-[calc(100vh-250px)]">
                <div className="border-gray-200 rounded-lg bg-gray-600/30">
                    <ul
                        className="flex gap-x-2 -mb-px text-sm  text-center max-w-full overflow-x-auto"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-content"
                        role="tablist"
                    >
                        {categories.map((tab, index) => (
                            <li key={tab.name} role="presentation">
                                <button
                                    onClick={() => {

                                        setCurrentTab(index);
                                    }}
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTab === index ? 'border-amber-500 text-amber-500' : ''
                                        }`}
                                >
                                    {tab.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex py-2 justify-end gap-x-4 px-4">
                <RoundedTextField
                        textColor="text-gray-500"
                        placeholder="Search category..."
                        height="30px"
                        width="250px"
                        prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        } />

                    <RoundedButton onClick={() => navigate("/orderAndBilling/create")} prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    }
                        height="30px"
                        label="Create new Category" />
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