import { useState } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { OrderProductCard } from "../../components/card/OrderProductCard";
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { DiningOption } from '../../constant/DiningOption'
import { SelectedOrderProductCard } from '../../components/card/SelectedOrderProductCard'
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";
import { useNavigate } from "react-router-dom";

export const CreateOrder = () => {
    const [loading, setLoading] = useState(true);  
    const [currentTab, setCurrentTab] = useState(0);
    const navigate = useNavigate();
    const [diningOption, setDiningOption] = useState(DiningOption.DineIn);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [currentProducts, setCurrentProducts] = useState([]);

    const sampleData = [
        {
            name: "Cafe",
            products: [
                {
                    id: 1,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 1",
                    price: "$19.99",
                    inStock: 100,
                },
                {
                    id: 2,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 2",
                    price: "$29.99",
                    inStock: 50,
                },
                {
                    id: 3,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 3",
                    price: "$39.99",
                    inStock: 75,
                },
                {
                    id: 4,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 4",
                    price: "$49.99",
                    inStock: 20,
                },
                {
                    id: 5,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 5",
                    price: "$59.99",
                    inStock: 30,
                },
                {
                    id: 6,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 6",
                    price: "$69.99",
                    inStock: 40,
                },
                {
                    id: 7,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 7",
                    price: "$79.99",
                    inStock: 60,
                },
                {
                    id: 8,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 8",
                    price: "$89.99",
                    inStock: 10,
                },
                {
                    id: 9,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 9",
                    price: "$99.99",
                    inStock: 5,
                },
                {
                    id: 10,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 10",
                    price: "$109.99",
                    inStock: 15,
                },
                {
                    id: 11,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 11",
                    price: "$119.99",
                    inStock: 25,
                },
                {
                    id: 12,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 12",
                    price: "$129.99",
                    inStock: 35,
                },
                {
                    id: 13,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 13",
                    price: "$139.99",
                    inStock: 45,
                },
                {
                    id: 14,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 14",
                    price: "$149.99",
                    inStock: 55,
                },
                {
                    id: 15,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 15",
                    price: "$159.99",
                    inStock: 65,
                },
                {
                    id: 16,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 16",
                    price: "$169.99",
                    inStock: 70,
                },
                {
                    id: 17,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/800px-A_small_cup_of_coffee.JPG",
                    name: "Product 17",
                    price: "$179.99",
                    inStock: 80,
                },
            ]
        },
        {
            name: "Food",
            products: [
                {
                    id: 6,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sandwich_with_beef.jpg/800px-Sandwich_with_beef.jpg",
                    name: "Product 6",
                    price: "$15.99",
                    inStock: 90,
                },
                {
                    id: 7,
                    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Apple_banana.jpg/800px-Apple_banana.jpg",
                    name: "Product 7",
                    price: "$25.99",
                    inStock: 95,
                }
            ]
        }
    ]

    const [categoryWithProducts, setCategoryWithProducts] = useState(sampleData);
    const [selectedProducts, setSelectedProducts] = useState([]);

    const handleAddProduct = (product) => {
        setSelectedProducts([...selectedProducts, product]);
        setTotalAmount(totalAmount + parseFloat(product.price.replace('$', '')));
    };

    const handlePlaceOrder = () => {
        navigate('/orderAndBilling/payment');
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

                    <ul
                        className="flex gap-x-2 -mb-px text-sm text-center max-w-full overflow-x-auto"
                        id="default-tab"
                        data-tabs-toggle="#default-tab-content"
                        role="tablist"
                    >
                        <li role="presentation">
                            <button
                                onClick={() => {
                                    setCurrentTab(0);
                                    setCurrentProducts(categoryWithProducts.flatMap((category) => category.products));
                                }}
                                className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTab === 0 ? 'border-amber-500 text-amber-500' : ''
                                    }`}
                            >
                                All
                            </button>
                        </li>
                        {categoryWithProducts.map((category, index) => (
                            <li key={category.name} role="presentation">
                                <button
                                    onClick={() => {
                                        setCurrentProducts(category.products);
                                        setCurrentTab(index + 1);
                                    }}
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${currentTab === index + 1 ? 'border-amber-500 text-amber-500' : ''
                                        }`}
                                >
                                    {category.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="grid grid-cols-2 gap-4 mt-8 max-h-[calc(100%-150px)] overflow-y-auto">
                        {currentProducts.map((product) => (
                            <OrderProductCard onClickAdd={() => handleAddProduct(product)} key={product.id} name={product.name} imageUrl={product.imageUrl} price={product.price} />
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
                        {selectedProducts.map((product) => (
                            <SelectedOrderProductCard key={`selectedProduct-${product.id}`} inStock={product.inStock} name={product.name} imageUrl={product.imageUrl} price={product.price} />
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