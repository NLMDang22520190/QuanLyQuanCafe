import { useState, useEffect, useRef } from "react";
import { OrderProductCard } from "../../components/card/OrderProductCard";
import { SelectedOrderProductCard } from '../../components/card/SelectedOrderProductCard'
import { useNavigate } from "react-router-dom";
import api from "../../features/AxiosInstance/AxiosInstance";
import { Input, Form, Radio, Button, Card, message, Modal, Table } from "antd";
import { OrderPayment } from "./OrderPayment";
import { useReactToPrint } from 'react-to-print';   


export const CreateOrder = () => {
    const [modalPrintVisible, setModalPrintVisible] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [currentTypeOfFoodId, setCurrentTypeOfFoodId] = useState(0);
    const navigate = useNavigate();
    const [totalAmount, setTotalAmount] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [currentMenuItems, setCurrentMenuItems] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    const [typeOfFoods, setTypeOfFoods] = useState([]);
    const [appliedVoucherId, setAppliedVoucherId] = useState(null);
    const [selectedMenuItems, setSelectedMenuItems] = useState([]);
    const contentRef = useRef(null);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);

    const receiptPrintCol = [
        {
            title: 'Name',
            dataIndex: 'itemName',
            key: 'itemName',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (text, record) => (
                <p>x{text}</p>
            )
        },

        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text, record) => (
                <p>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text, record) => (
                <p>{(record.price * record.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            )
        },
    ]

    const handlePrintReceipt = () => {
        window.print(contentRef.current);
    }


    const createOrder = async (values) => {

        const response = await api.post('api/Order', values).then((response)=> {
            message.success('Order created successfully');
        }).catch((error) => {
            message.error(`Error: ${error.response.data}`);
        });
        
    }

    const handleAddProduct = (product) => {
        const existingProduct = selectedMenuItems.find(item => item.itemId === product.itemId);
        if (existingProduct) {
            alert("This product is already added to the order.");
            return;
        }
        setSelectedMenuItems([...selectedMenuItems, { ...product, quantity: 1 }]);

        setTotalAmount(totalAmount + parseFloat(product.price));
    };

    const handlePlaceOrder = (values) => {
        setIsCreatingOrder(true);
        values.voucherApplied = appliedVoucherId;
        values.orderDetails = selectedMenuItems.map(item => {
            return { itemId: item.itemId, quantity: item.quantity }
        });
    createOrder(values).then(() => {
        setModalPrintVisible(true);
    }).catch((error) => {}).finally(() => {
        setIsCreatingOrder(false);
    });
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
            message.error('Failed to fetch menu items');
        } finally {
            setLoading(false);
        }
    }

    const fetchTypeOfFoods = async () => {
        try {
            const response = await api.get('api/food-types');
            const data = await response.data;
            setTypeOfFoods(data);
            setCurrentTypeOfFoodId(data[0].typeOfFoodId);
        } catch (error) {
            message.error('Failed to fetch type of foods');
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
        setSelectedMenuItems(updatedItems);
        calculateTotalAmount(updatedItems);
    }

    const calculateTotalAmount = (updatedItems) => {
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
        }
    }, [currentTypeOfFoodId, menuItems]);

    if (menuItems.length === 0) {
        return <div>Loading...</div>;
    }

    const handleApplyVoucher = (voucherCode) => {
        getVoucherByCode(voucherCode).then((voucher) => {
            if (!voucher) {
                message.error('Invalid voucher code');
                return;
            }
            setAppliedVoucherId(voucher.voucherId);
            message.success('Voucher applied successfully');
            setDiscount(totalAmount * (voucher.percentDiscount / 100));
        });
    };

    const getVoucherByCode = async (voucherCode) => {
        try {
            const response = await api.get(`api/Voucher/GetVoucherByCode/${voucherCode}`);
            const voucher = response.data;
            return voucher;
        } catch (error) {
            message.error(error.data);
        }
    };

    
    return (<>

        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Create New Order</h2>
                <div className="flex gap-x-2">

                </div>
            </div>
            <Form onFinish={handlePlaceOrder}>
                {
                    <>
                        <div style={{ display: step == 1 ? '' : 'none' }} className="flex max-h-[calc(100vh-180px)]  min-h-[calc(100vh-180px)] w-full gap-x-4">
                            <Card className="w-2/3 rounded-lg flex flex-col p-4">
                                <div className="w-1/2">

                                    <Input width={"100px"} placeholder="Search for food..." prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                    </svg>} />

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
                                <div className="grid grid-cols-2 gap-4 mt-8 grow overflow-y-auto">
                                    {currentMenuItems.map((product) => (
                                        <OrderProductCard onClickAdd={() => handleAddProduct(product)} key={product.id} name={product.itemName} imageUrl={product.imageUrl} price={product.price} />
                                    ))}
                                </div>
                            </Card>
                            <Card className="flex w-1/3 rounded-lg justify-center" >
                                <div className="flex flex-col h-full gap-y-4">
                                    <h2 className="text-amber-500 font-medium text-2xl">Order Summary</h2>
                                    <Form.Item className="flex flex-col overflow-y-auto gap-2 grow divide-y divide-amber-500" >

                                        {selectedMenuItems.map((product) => (
                                            <SelectedOrderProductCard
                                                key={product.itemId}
                                                inStock={product.stock}
                                                name={product.itemName}
                                                imageUrl={product.imageUrl}
                                                price={product.price}
                                                onQuantityChange={(quantity) => { handleQuantityChange(quantity, product.itemId) }}
                                                onRemove={() => handleRemoveItem(product.itemId)}
                                            />
                                        ))}
                                    </Form.Item>
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex justify-center w-full gap-x-2">
                                            <Form.Item>
                                                <Input
                                                    name="voucherCode"
                                                    prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                                    </svg>}
                                                    placeholder="Enter promotion code..."
                                                    onPressEnter={(e) => handleApplyVoucher(e.target.value)}
                                                />
                                            </Form.Item>
                                            <Button type="primary" onClick={() => handleApplyVoucher(
                                                document.querySelector('input[name="voucherCode"]').value
                                            )}>Apply</Button>
                                        </div>
                                        <div className="flex justify-between">
                                            <p>Total Amount:</p>
                                            <p>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <p>Discount:</p>
                                            <p>{discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        </div>

                                        <div className="flex justify-between">
                                            <p>Final Amount:</p>
                                            <p>{(totalAmount - discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                                        </div>

                                        <div className="flex gap-4 justify-center w-full">
                                            <Button type="primary" onClick={() => setStep(2)} >Place Order</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div style={{ display: step == 2 ? '' : 'none' }}>
                            <OrderPayment isCreatingOrder={isCreatingOrder} totalAmount={totalAmount} discountAmount={discount} finalAmount={totalAmount - discount} onBack={() => setStep(1)} />
                        </div>
                    </>
                }
            </Form>
        </div>
        {
            modalPrintVisible && <Modal title="Receipt" open={modalPrintVisible} footer={
                <div className="flex flex-col justify-between gap-y-2 col-span-2">
                    <Button type="dashed" onClick={()=>handlePrintReceipt()}>Print</Button>
                    <Button type="primary" onClick={() => navigate('/orderAndBilling')}>Ok</Button>
                </div>
            } onCancel={() => setModalPrintVisible(false)}>
                <div ref={contentRef}  className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col justify-start gap-y-2">
                        <p className="text-xl">FROM</p>
                        <p>Rise and Drink</p>
                        <p>University of Information Technology, Thu Duc, HCM City</p>
                    </div>
                    <div className="flex flex-col justify-start gap-y-2">
                        <p className="flex justify-between">Receipt: <span>#{Math.floor(Math.random() * 1000000)}</span></p>
                        <p className="flex justify-between">Date: <span>{new Date().toLocaleDateString()}</span></p>
                    </div>
                    <div className="flex flex-col justify-start gap-y-2 col-span-2">
                        <p className="text-xl">TO</p>
                        <p className="flex justify-between">Customer: <span>Default Customer</span></p>
                        <p className="flex justify-between">Address<span>In store</span></p>
                    </div>
                    <div className="flex flex-col justify-start gap-y-2 col-span-2">
                        <p className="text-xl">ORDER SUMMARY</p>
                        <div className="flex flex-col gap-y-2">
                            <Table dataSource={selectedMenuItems} columns={receiptPrintCol} pagination={false} />
                        </div>
                    </div>
                    <div className="flex flex-col justify-end gap-y-2 col-span-2">
                        <div className="flex justify-end gap-12">
                            <p>Total Amount:</p>
                            <p>{totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                        <div className="flex justify-end gap-12">
                            <p>Discount:</p>
                            <p>{discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    </div>
                    <div className="flex flex-col justify-end gap-y-2 col-span-2">
                        <div className="flex justify-end gap-12">
                            <p className="text-xl font-medium">Final Amount:</p>
                            <p>{(totalAmount - discount).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        </div>
                    </div>
                </div>    
            </Modal>
        }
    </>
    )
}