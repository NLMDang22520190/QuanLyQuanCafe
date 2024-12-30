import { useState, useEffect } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { OrderProductCard } from "../../components/card/OrderProductCard";
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { DiningOption } from '../../constant/DiningOption'
import { SelectedOrderProductCard } from '../../components/card/SelectedOrderProductCard'
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";
import { useNavigate } from "react-router-dom";
import api from "../../features/AxiosInstance/AxiosInstance";
import { Input, Form, Radio, Button } from "antd";
import { OrderPayment } from "./OrderPayment";

export const CreateOrder = () => {
    const [step, setStep] = useState(1);
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
    const diningOptions = [
        { label: 'In Store', value: 'In Store' },
        { label: 'Give away', value: 'Give-away' },
        { label: 'Delivery', value: 'Delivery' },
    ]

    const handleAddProduct = (product) => {
        const existingProduct = selectedMenuItems.find(item => item.itemId === product.itemId);
        if (existingProduct) {
            alert("This product is already added to the order.");
            return;
        }
        setSelectedMenuItems([...selectedMenuItems, { ...product, quantity: 1 }]);

        setTotalAmount(totalAmount + parseFloat(product.price));
    };

    const handlePlaceOrder = () => {
        navigate('/orderAndBilling/payment');
    }

    const fetchMenuItems = async () => {
        setLoading(true);
        try {
            const response = await api.get('api/menu-items');
            const data = response.data;

            const menuItemsWithImages = await Promise.all(data.map(async (item) => {
                if (item.picture) {
                    const imageResponse = await api.get(`api/Image/${item.picture}`, { responseType: 'blob' });
                    console.log(imageResponse);
                    const imageUrl = URL.createObjectURL(imageResponse.data);
                    return { ...item, imageUrl };
                }
                return { ...item, imageUrl: null };
            }));

            setMenuItems(menuItemsWithImages);
        } catch (error) {
            console.error('Error fetching menu items:', error);
        } finally {
            setLoading(false);
        }
    }

    const fetchTypeOfFoods = async () => {
        try {
            const response = await api.get('api/food-types');
            const data = await response.data;
            setTypeOfFoods(data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleQuantityChange = (quantity, itemId) => {
        const updatedItems = selectedMenuItems.map(product => {
            if (product.itemId === itemId) {
                product.quantity = quantity;
            }
            return product;
        });
        setSelectedMenuItems(updatedItems);
        calculateTotalAmount(updatedItems)
    }

    const handleRemoveItem = (itemId) => {
        const updatedItems = selectedMenuItems.filter(item => item.itemId !== itemId);
        const removedItem = selectedMenuItems.find(item => item.itemId === itemId);
        setSelectedMenuItems(updatedItems);
        calculateTotalAmount(updatedItems);
    }

    const calculateTotalAmount = (updatedItems) => {
        console.log(updatedItems)
        setTotalAmount(
            updatedItems.reduce((total, product) => total + product.price * product.quantity, 0)
        )
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

                </div>
            </div>

            {
                step === 1 ? (
                    <div className="flex max-h-[calc(100vh-180px)]  min-h-[calc(100vh-180px)] w-full gap-x-4">
                        <div className="bg-gray-800/60 w-2/3 rounded-lg flex flex-col p-4">
                            <div className="w-1/2">
                                <Input width={"100px"} placeholder="Search for food..." prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>} >
                                </Input>
                            </div>
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
                        <Form className="flex flex-col bg-gray-800/60 w-1/3 rounded-lg p-4 gap-y-4" >
                            <Form.Item
                                className="flex justify-center"
                            >
                                <Radio.Group options={diningOptions} optionType="button" />
                            </Form.Item>
                            <div className="flex flex-col overflow-y-auto grow gap-y-2">
                                {selectedMenuItems.map((product) => (
                                    <SelectedOrderProductCard
                                        key={`selectedProduct-${product.itemId}`}
                                        inStock={product.stock}
                                        name={product.itemName}
                                        imageUrl={product.imageUrl}
                                        price={product.price}
                                        onQuantityChange={(quantity) => { handleQuantityChange(quantity, product.itemId) }}
                                        onRemove={() => handleRemoveItem(product.itemId)}
                                    />
                                ))}
                            </div>

                            <div className="flex flex-col gap-y-2">
                                <div className="flex justify-center w-full">
                                    <Input prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                    </svg>} placeholder="Enter promotion code..." ></Input>
                                </div>
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
                                    <Button type="primary" onClick={()=>setStep(2)} >Place Order</Button>
                                </div>


                            </div>

                        </Form>

                    </div>
                ) : (
                    <OrderPayment onBack={()=>setStep(1)} />
                )
            }


        </div>
    )
}