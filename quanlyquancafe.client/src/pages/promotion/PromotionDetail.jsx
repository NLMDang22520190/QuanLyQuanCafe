import { Input, TimePicker, DatePicker, InputNumber, Select, Steps, Radio, Form, Button } from 'antd';
import axios from 'axios';
import api from '../../features/AxiosInstance/AxiosInstance';
import { use, useEffect, useState } from 'react';
import moment from 'moment';

export const PromotionDetail = ({voucherId ,onSubmit, onClose}) => {
    const [voucher, setVoucher] = useState();
   
    const handleUpdateVoucher = (values) => {  
        
        values.voucherStartDate = values.voucherStartDate.format('YYYY-MM-DD');
        values.voucherEndDate = values.voucherEndDate.format('YYYY-MM-DD');
        
        updateVoucher(values); 
    } 

    const fetchVoucherById = (voucherId) => {
        api.get(`https://localhost:7087/api/voucher-details/${voucherId}`).then(res => {
            const data = res.data;

            data.voucherStartDate = moment(data.voucherStartDate);
            data.voucherEndDate = moment(data.voucherEndDate);

            setVoucher(data);
            
        }).catch(err => {
            console.log(err);
        });
    }

    const updateVoucher = (values) => {
        console.log(voucherId);
        api.put(`https://localhost:7087/api/voucher-details/${voucherId}`, values)
        .then(res => {
            onSubmit();
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (voucherId) {
            fetchVoucherById(voucherId);
        }
       }, [voucherId]);
    
    if (!voucher) {
        return <div>Loading...</div>;
    }

    return (
        <Form 
        initialValues={voucher}  
        layout="horizontal" 
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }} 
        onFinish={handleUpdateVoucher}
        >
            <Form.Item 
            label="Promotion Name" 
            name="voucherName" 
            rules={[{ required: true, message: 'Please input promotion name!' }]}
            >
                <Input 
                    name='voucherName'
                    prefix={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                    } 
                    placeholder="Promotion Name" 
                />
            </Form.Item>
            <Form.Item
             name='voucherCode' 
             label="Promotion Code"
             rules={[{ required: true, message: 'Please input promotion code!' }]}>
                <Input 
                    name='voucherCode'
                    prefix={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                        </svg>
                    } 
                    placeholder="Promotion Code" 
                />
            </Form.Item>

            <Form.Item 
            name='voucherStartDate'
            label="Start Time"
            rules={[{ required: true, message: 'Please input promotion start date!' }]}>
                <DatePicker />
            </Form.Item>

            <Form.Item label="End Time"
            name='voucherEndDate'
            rules={[{ required: true, message: 'Please input promotion end date!' }]}>
                <DatePicker />
            </Form.Item>
            <Form.Item 
            label="Discount percentage"
            name='percentDiscount'
            rules={[{ required: true, message: 'Please input discount percentage!' }]}>
                <InputNumber />
            </Form.Item>
            <Form.Item 
            label="Min order required"
            name='minOrderAmount'
            rules={[{ required: true, message: 'Please input min order required!' }]}>
                <InputNumber name='minOrderRequired' />
            </Form.Item>
            <Form.Item 
            label="Points required"
            name='pointsRequired'
            rules={[{ required: true, message: 'Please input points required!' }]}
            >
                <InputNumber name='pointsRequired' />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
}

