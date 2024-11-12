import { useState } from "react";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { OrderProductCard } from "../../components/card/OrderProductCard";
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { DiningOption } from '../../constant/DiningOption'
import { SelectedOrderProductCard } from '../../components/card/SelectedOrderProductCard'
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox";
import { PaymentMethod } from "../../constant/PaymentMethod";
import { Currency } from '../../constant/Currency';
import QRCode from "react-qr-code";


export const OrderPayment = () => {
    const [diningOption, setDiningOption] = useState(DiningOption.DineIn);
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState(PaymentMethod.Cash);
    const [currency, setCurrency] = useState()

    const qrData = `
    000201010211
    52040000
    5303986
    5802SG
    5405100.00
    5910SampleBank
    6010Singapore
    6304ABCD
`.replace(/\s+/g, '');

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

    const [selectedProducts, setSelectedProducts] = useState(productData)

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Order Payment</h2>
                <div className="flex gap-x-2">


                    <RoundedButton prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    } height="40px" label="Export Order Report" />

                </div>
            </div>

            <div className="flex max-h-[calc(100vh-180px)]  min-h-[calc(100vh-180px)] w-full gap-x-4">
                <div className="bg-gray-800/60 w-2/3 rounded-lg flex gap-x-8 p-4">
                    <div className="flex flex-col justify-between w-full">
                        <div className="flex flex-col items-center" >
                            
                            <QRCode value={qrData} size={300} />
                            <p>Scan this code to initiate payment.</p>
                        </div>

                        <div className="flex gap-x-8">
                            <div className="flex flex-col w-1/2 gap-y-4">
                                <p className="text-xl">Choose Payment method:</p>
                                <RoundedButton
                                    onClick={() => setPaymentMethod(PaymentMethod.Cash)}
                                    label={PaymentMethod.Cash}
                                    style={paymentMethod != PaymentMethod.Cash ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />

                                <RoundedButton
                                    onClick={() => setPaymentMethod(PaymentMethod.BankTransfer)}
                                    label={PaymentMethod.BankTransfer}
                                    style={paymentMethod != PaymentMethod.BankTransfer ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />
                                <RoundedButton
                                    onClick={() => setPaymentMethod(PaymentMethod.Momo)}
                                    label={PaymentMethod.Momo}
                                    style={paymentMethod != PaymentMethod.Momo ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />
                                <RoundedButton
                                    onClick={() => setPaymentMethod(PaymentMethod.Credit)}
                                    label={PaymentMethod.Credit}
                                    style={paymentMethod != PaymentMethod.Credit ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />
                            </div>

                            <div className="flex flex-col w-1/2 gap-y-4">
                                <p className="text-xl">Choose Currency:</p>
                                <RoundedButton
                                    onClick={() => setCurrency(Currency.VND)}
                                    label={Currency.VND}
                                    style={currency != Currency.VND ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />

                                <RoundedButton
                                    onClick={() => setCurrency(Currency.USD)}
                                    label={Currency.USD}
                                    style={currency != Currency.USD ? "rounded-md bg-gray-500/10 border border-amber-500" : "rounded-md text-black hover:bg-amber-600 bg-amber-500"}
                                    paddingX="100px"
                                    height="40px"
                                />
                            </div>
                        </div>


                    </div>

                </div>
                <div className="flex flex-col bg-gray-800/60 w-1/3 rounded-lg p-4 gap-y-4">
                    <div className="flex flex-col grow">
                        <div className="flex justify-between gap-y-2">
                            <p>Total Amount:</p>
                            <p>0$</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Discount:</p>
                            <p>0$</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Final Amount:</p>
                            <p>0$</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Payment Method:</p>
                            <p>{paymentMethod}</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-4">
                        <div className="flex justify-between">
                            <p>Given money:</p>
                            <p>$0</p>
                        </div>

                        <div className="flex justify-between ">
                            <p>Change:</p>
                            <p>$0</p>
                        </div>

                        <RoundedButton
                            onClick={() => { }}
                            label="Submit"
                            paddingX="100px"
                            height="40px"
                        />
                    </div>



                </div>
            </div>
        </div>
    )
}