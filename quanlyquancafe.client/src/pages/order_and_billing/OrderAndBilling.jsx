import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { TableLayout } from "../../components/tables/TableLayout"
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { TableDetailType } from "../../constant/TableDetailType";
import { Table, Tag, Button, Input, Modal, Select, Pagination, message } from 'antd';
import api from "../../features/AxiosInstance/AxiosInstance"
import { useEffect, useState } from "react";
import OrderExport from "./OrderExport";

export const OrderAndBilling = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState()
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderExportVisible, setOrderExportVisible] = useState(false);

    const fetchOrder = async () => {
        const response = await api.get("api/Order")
        .then((response) => {
            setOrders(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const updateOrderStatus = async (status) => {
        const orderId = selectedOrder.orderId;
        const state = status.state;
        const response = await api.put(`api/Order/update-order-state/${orderId}`, state).then((response) => {
            fetchOrder();
            message.success("Order status updated successfully")
          }).catch((error) => { 
            message.error("Failed to update order status")
           })
    }

    useEffect(() => {
        fetchOrder();
    }, [])

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId', 
        },
        {
            title: 'Date & Time',
            dataIndex: 'orderTime',
            key: 'orderTime',
            render: orderTime => (
                <p>{new Date(orderTime).toLocaleString()}</p>
            )   
        },
        {
            title: 'Order Detail',  
            dataIndex: 'orderDetails',
            key: 'orderDetails',
            render: orderDetails => (
                <ul>
                    {orderDetails?.map(detail => (
                        console.log(detail),
                        <li key={detail.item.itemId}>
                            {detail.item.itemName} x {detail.quantity}
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Total Amount',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
        },
        {
            title: 'Order Status',
            dataIndex: 'orderState',
            key: 'orderState',
            render: status => {
                let color = 'geekblue';
                if (status === 'Completed') {
                    color = 'green';
                } else if (status === 'Pending') {
                    color = 'volcano';
                } else if (status === 'Cancelled') {
                    color = 'red';
                } else if (status === 'In Progress') {
                    color = 'blue';
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button type="link" onClick={() => setSelectedOrder(record)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
                </Button>
            ),
        },
    ];

    const orderDetailsColumns = [
        {
            title: 'Item Name',
            dataIndex: 'item',
            key: 'item',
            render: item => {
                return <p>{item.itemName}</p>
            }
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            render: quantity => {
                return <p>x{quantity}</p>
            }
        },
        {
            title: 'Price',
            dataIndex: 'item',
            key: 'item', 
            render: item => {
                return <p>${item.price}</p>
            }  
        }
    ]

    return (
        <>
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Order & Billing</h2>
                <div className="flex gap-x-2">
                    <Input
                        placeholder="Search Order"
                        prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>}
                    />

                    <Button onClick={()=>setOrderExportVisible(true)} type="primary" className="flex items-center gap-x-2" size="large">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                        Export CSV
                    </Button>

                    <Button onClick={() => navigate("/orderAndBilling/create")} type="primary" className="flex items-center gap-x-2" size="large">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create new Order
                    </Button>
                </div>
            </div>
            <div className="">
                <Table columns={columns} dataSource={orders}  loading={!orders} pagination={{pageSize: 7}} />
            </div>
            
        </div>
        <Modal title="Order Detail" footer={null} open={selectedOrder} onOk={() => setSelectedOrder(null)} onCancel={() => setSelectedOrder(null)} 
        >
            {selectedOrder && (
                <div className="flex flex-col gap-y-2">
                    <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                    <p><strong>Date & Time:</strong> {selectedOrder.orderTime}</p>
                    <p className="flex items-center gap-x-2"><strong>Order Status:</strong> 
                        <Select  
                            defaultValue={selectedOrder.orderState} 
                            style={{ width: 120 }} 
                            onChange={(value) => updateOrderStatus({ state: value })}
                        >
                            <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="In Progress">In Progress</Select.Option>
                            <Select.Option value="Completed">Completed</Select.Option>
                            <Select.Option value="Cancelled">Cancelled</Select.Option>
                        </Select>
                    </p>
                    <p><strong>Order Items:</strong></p>
                    <Table columns={orderDetailsColumns} dataSource={selectedOrder.orderDetails}/>
                    <p className="flex gap-2"><strong>Applied Voucher:</strong> 
                    {
                        selectedOrder.voucherApplied ? selectedOrder.voucherApplied.voucherCode : "No voucher applied"
                    } </p>
                    <p><strong>Total Amount:</strong> ${selectedOrder.totalPrice}</p>
                </div>
            )}
        </Modal>
        <Modal title="Export Orders" footer={null} open={orderExportVisible} onOk={() => setOrderExportVisible(false)} onCancel={() => setOrderExportVisible(false)}  >
            <OrderExport orders={orders} />
        </Modal>
        </>
    )
}