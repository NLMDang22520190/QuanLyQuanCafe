import { useState, useEffect } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { OrderProductCard } from "../../components/card/OrderProductCard";
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { DiningOption } from '../../constant/DiningOption'
import { SelectedOrderProductCard } from '../../components/card/SelectedOrderProductCard'
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";
import { useNavigate } from "react-router-dom";
import api from "../../features/AxiosInstance/AxiosInstance";

export const CreateOrder = () => {
    const [loading, setLoading] = useState(true);
    const [currentTypeOfFoodId, setCurrentTypeOfFoodId] = useState(0);
    const navigate = useNavigate();
    const [diningOption, setDiningOption] = useState(DiningOption.DineIn);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [currentProducts, setCurrentProducts] = useState([]);
    const [currentMenuItems, setCurrentMenuItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [typeOfFoods, setTypeOfFoods] = useState([]);
    const [selectedMenuItems, setSelectedMenuItems] = useState([]);

    const handleAddProduct = (product) => {
        const existingProduct = selectedMenuItems.find(item => item.id === product.id);
        if (existingProduct) {
            alert("This product is already added to the order.");
            return;
        }
        setSelectedMenuItems([...selectedMenuItems, product]);
        setTotalAmount(totalAmount + parseFloat(product.price));
    };

    const handlePlaceOrder = () => {
        navigate('/orderAndBilling/payment');
    }

    const fetchMenuItems = async () => {
        setLoading(true);
        api.get('api/menu-items').then(response => {
            const data = response.data;
            setMenuItems(data);
        }).catch(error => { }).finally(() => setLoading(false));
    }

    const fetchTypeOfFoods = async () => {
        try {
            const response = await api.get('api/food-types');
            const data = await response.data;
            setTypeOfFoods(data);
            setCurrentTypeOfFoodId(data[0].typeOfFoodId);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        fetchTypeOfFoods();
        fetchMenuItems();
    }, []);
    
    useEffect(() => {
        if (menuItems.length > 0) {
           setCurrentMenuItems(menuItems.filter(item => item.typeOfFoodId === currentTypeOfFoodId));
           console.log(currentMenuItems);
        }   
    }, [currentTypeOfFoodId, menuItems]); 
    
    if (menuItems.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Create New Order</h2>
                <div className="flex gap-x-2">


                    <RoundedButton prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    } height="40px" label="Export Order Report" />

                </div>
            </div>

            <div className="flex max-h-[calc(100vh-180px)]  min-h-[calc(100vh-180px)] w-full gap-x-4">
                <div className="bg-gray-800/60 w-2/3 rounded-lg flex flex-col p-4">
                    <RoundedTextField
                        textColor="text-gray-500"
                        placeholder="Search dishes or beverage..."
                        height="40px"
                        width="60%"
                        prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        } />

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
                    <div className="grid grid-cols-2 gap-4 mt-8 max-h-[calc(100%-150px)] overflow-y-auto">
                        {currentMenuItems.map((product) => (
                            <OrderProductCard onClickAdd={() => handleAddProduct(product)} key={product.id} name={product.itemName} imageUrl={product.imageUrl} price={product.price} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col bg-gray-800/60 w-1/3 rounded-lg p-4 gap-y-4">
                    <div className="flex gap-4 justify-center">
                        <RoundedButton
                            onClick={() => setDiningOption(DiningOption.DineIn)}
                            paddingX="10px"
                            style={diningOption != DiningOption.DineIn ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                            label="Dine-in" />
                        <RoundedButton
                            onClick={() => setDiningOption(DiningOption.Takeaway)}
                            paddingX="20px"
                            label="Take-away" style={diningOption != DiningOption.Takeaway ? " rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"} />
                        <RoundedButton
                            onClick={() => setDiningOption(DiningOption.Delivery)}
                            paddingX="10px"
                            label="Delivery" style={diningOption != DiningOption.Delivery ? " rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"} />

                    </div>

                    <div className="flex flex-col overflow-y-auto grow gap-y-2">
                        {selectedMenuItems.map((product) => (
                            <SelectedOrderProductCard key={`selectedProduct-${product.itemId}`} inStock={product.stock} name={product.itemName} imageUrl={product.imageUrl} price={product.price} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <div className="flex justify-center w-full">
                            <RoundedTextField
                                placeholder="Enter promotion code..."
                                prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>
                                }
                                height="40px" />
                        </div>
                        {
                            diningOption === DiningOption.DineIn && (<div className="flex justify-between">
                                <p>Table:</p>
                                <RoundedComboBox width="200px" options={[{ value: "tb01", label: "Table 1" }, { value: "tb02", label: "Table 2" }]} placeholder="Choose table..." />
                            </div>)
                        }

                        <div className="flex justify-between">
                            <p>Total Amount:</p>
                            <p>${totalAmount}</p>
                        </div>

                        <div className="flex justify-between">
                            <p>Discount:</p>
                            <p>${discount}</p>
                        </div>

                        <div className="flex justify-between">
                            <p>Final Amount:</p>
                            <p>${totalAmount - discount}</p>
                        </div>

                        <div className="flex gap-4 justify-center w-full">
                            <RoundedButton onClick={handlePlaceOrder} label="Place order" height="40px" paddingX="50px" />
                        </div>


                    </div>


                </div>
            </div>
        </div>
    )
}