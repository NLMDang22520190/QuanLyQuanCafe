import { Input, TimePicker, DatePicker, InputNumber, Select, Steps, Radio, Form, Button } from 'antd';
const { Option } = Select;
import { useState } from 'react';
import PromotionType from '../../constant/PromotionType';

export const PromotionDetail = () => {
    const [selectedPromotionType, setSelectedPromotionType] = useState('percentage');
    const [currentStep, setCurrentStep] = useState(0);
    const [type, setType] = useState('Product');

    const selectAfter = (
        <Select defaultValue="USD" style={{ width: 100 }}>
            <Option value="USD">$</Option>
            <Option value="VND">VND</Option>
            <Option value="percentage">%</Option>
        </Select>
    );
    const promotionTypes = Object.keys(PromotionType).map((key) => ({
        label: PromotionType[key],
        value: key,
    }));

    const onChangeStep = current => { setCurrentStep(current); };

    return (
        <Form layout="horizontal" className='flex flex-col gap-y-4' labelCol={{ span: 7 }}  wrapperCol={{ span: 24 }}>


            <div className='flex flex-col gap-y-4'>
                <Form.Item label="Promotion Name">
                    <Input prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                    } placeholder="Promotion Name" />
                </Form.Item>
                <Form.Item label="Promotion Code">
                    <Input prefix={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                    </svg>
                    } placeholder="Promotion Code" />
                </Form.Item>

                <Form.Item label="Start Time">
                    <div className='flex gap-x-4 items-center justify-between'>
                        <TimePicker />
                        <DatePicker />
                    </div>
                </Form.Item>

                <Form.Item label="End Time">
                    <div className='flex gap-x-4 items-center justify-between'>
                        <TimePicker />
                        <DatePicker />
                    </div>
                </Form.Item>

            </div>

            <div className='flex flex-col gap-y-4'>
                <Form.Item label="Type">
                    <Radio.Group>
                        {promotionTypes.map((type) => (
                            <Radio.Button value={type.value} key={type.value}>
                                {type.label}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Discount">
                    <InputNumber addonAfter={selectAfter} defaultValue={100} />
                </Form.Item>
                <Form.Item label="Status">
                    <Radio.Group>
                        <Radio value={1}>Active</Radio>
                        <Radio value={0}>Inactive</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item label="Applied Products">
                    <Select
                        mode="multiple"
                        style={{ width: '50%' }}
                        placeholder="Select products" />
                </Form.Item>
                <Form.Item label="Description">
                    <Input.TextArea placeholder='Enter description' />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save Change
                    </Button>
                </Form.Item>
                
            </div>

        </Form>
    );
}

