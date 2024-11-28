import { useState } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { OrderProductCard } from "../../components/card/OrderProductCard";
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import {DiningOption} from '../../constant/DiningOption'
import {SelectedOrderProductCard} from '../../components/card/SelectedOrderProductCard'
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";
import { useNavigate } from "react-router-dom";

export const CreateOrder = () => {
    const navigate = useNavigate();
    const [diningOption, setDiningOption] = useState(DiningOption.DineIn);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    

    const productData = [
        {
            id: 1,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
            name: "Product 1",
            price: "$19.99"
        },
        {
            id: 2,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
            name: "Product 2",
            price: "$29.99"
        },
        {
            id: 3,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
            name: "Product 3",
            price: "$39.99"
        },
        {
            id: 4,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
            name: "Product 4",
            price: "$49.99"
        },
        {
            id: 5,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
            name: "Product 5",
            price: "$59.99"
        },
        {
            id: 6,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sandwich_with_beef.jpg/800px-Sandwich_with_beef.jpg",
            name: "Product 6",
            price: "$15.99"
        },
        {
            id: 7,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Apple_banana.jpg/800px-Apple_banana.jpg",
            name: "Product 7",
            price: "$25.99"
        },
        {
            id: 8,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Tacos_de_Carnitas.jpg/800px-Tacos_de_Carnitas.jpg",
            name: "Product 8",
            price: "$35.99"
        },
        {
            id: 9,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Sushi_November_2006.jpg/800px-Sushi_November_2006.jpg",
            name: "Product 9",
            price: "$45.99"
        },
        {
            id: 10,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/800px-Red_Apple.jpg",
            name: "Product 10",
            price: "$55.99"
        },
        {
            id: 11,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Chocolate_ice_cream_with_sprinkles_and_syrup.jpg/800px-Chocolate_ice_cream_with_sprinkles_and_syrup.jpg",
            name: "Product 11",
            price: "$65.99"
        },
        {
            id: 12,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Various_Cheese.jpg/800px-Various_Cheese.jpg",
            name: "Product 12",
            price: "$75.99"
        },
        {
            id: 13,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Orange_juice_1.jpg/800px-Orange_juice_1.jpg",
            name: "Product 13",
            price: "$85.99"
        },
        {
            id: 14,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Honey_and_jam.jpg/800px-Honey_and_jam.jpg",
            name: "Product 14",
            price: "$95.99"
        },
        {
            id: 15,
            imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Dark_chocolate_bar.jpg/800px-Dark_chocolate_bar.jpg",
            name: "Product 15",
            price: "$105.99"
        },
    ];
    
    const [selectedProducts, setSelectedProducts] = useState(productData);

    const handlePlaceOrder = () => {
        navigate('/orderAndBilling/payment');
    }

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Order & Billing</h2>
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
                    <div className="grid grid-cols-2 gap-4 mt-8 overflow-y-auto">
                        {productData.map((product) => (
                            <OrderProductCard key={product.id} name={product.name} imageUrl={product.imageUrl} price={product.price} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col bg-gray-800/60 w-1/3 rounded-lg p-4 gap-y-4">
                    <div className="flex gap-4 justify-center">
                        <RoundedButton 
                        onClick={() => setDiningOption(DiningOption.DineIn)}
                        paddingX="10px" 
                        style={diningOption != DiningOption.DineIn ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500" } 
                        label="Dine-in"/>
                        <RoundedButton 
                         onClick={() => setDiningOption(DiningOption.Takeaway)}
                        paddingX="20px" 
                        label="Take-away" style={diningOption != DiningOption.Takeaway ? " rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500" }/>
                        <RoundedButton 
                         onClick={() => setDiningOption(DiningOption.Delivery)}
                        paddingX="10px" 
                        label="Delivery" style={diningOption != DiningOption.Delivery ? " rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500" }/>

                    </div>

                    <div className="flex flex-col overflow-y-auto grow gap-y-2">
                        {selectedProducts.map((product) => (
                            <SelectedOrderProductCard key={`selectedProduct-${product.id}`} name={product.name} imageUrl={product.imageUrl} price={product.price}/>
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
                            height="40px"/>
                        </div>
                        {
                         diningOption === DiningOption.DineIn && ( <div className="flex justify-between">
                            <p>Table:</p>
                            <RoundedComboBox width="200px" options={[{value: "tb01", label: "Table 1"}, {value: "tb02", label: "Table 2"}]} placeholder="Choose table..."/>
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
                            <p>${discount}</p>
                        </div>

                        <div className="flex gap-4 justify-center w-full">
                        <RoundedButton onClick={handlePlaceOrder} label="Place order" height="40px" paddingX="50px"/>
                        </div>

                       
                    </div>

                    
                </div>
            </div>
        </div>
    )
}