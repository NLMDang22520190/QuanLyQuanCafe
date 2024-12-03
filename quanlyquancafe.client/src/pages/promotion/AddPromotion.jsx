import {Input, TimePicker, DatePicker, InputNumber, Select, Steps, Radio} from 'antd';
const { Option } = Select;
import { useState } from 'react';
import PromotionType from '../../constant/PromotionType';

export const AddPromotion = () => {
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
    <div className='flex flex-col gap-y-4'>
        <Steps
            type="navigation"
            size="small"
            current={currentStep}
            onChange={onChangeStep}
            className="site-navigation-steps"
            items={[
                {
                    title: 'Step 1',
                    status: currentStep === 0 ? 'process' : 'finish',
                    description: 'Basic information.',
                },
                {
                    title: 'Step 2',
                    status: currentStep === 1 ? 'process' : 'wait',
                    description: 'Type and details.',
                },
            ]}
        />
        {currentStep === 0 && (
            <div className='flex flex-col gap-y-4'>
                <div className='flex flex-col'>
                    <label>Promotion Name</label>
                    <Input placeholder="Promotion Name" />
                </div>
                <div className='flex flex-col'>
                    <label>Promotion Code</label>
                    <Input placeholder="Promotion Code" />
                </div>
                <div className='flex gap-x-4 items-center'>
                    <p>Start Time</p>
                    <TimePicker />
                    <DatePicker />
                </div>
                <div className='flex gap-x-4 items-center'>
                    <p>End Time</p>
                    <TimePicker />
                    <DatePicker />
                </div>
            </div>
        )}
        {currentStep === 1 && (
            <div className='flex flex-col gap-y-4'>
                <div className='flex gap-x-4 items-center'>
                    <label>Type</label>
                    <Radio.Group >
                        {promotionTypes.map((type) => (
                            <Radio.Button value={type.value} key={type.value}>
                                {type.label}
                            </Radio.Button>
                        ))}
                    </Radio.Group>
                </div>
                <div className='flex gap-x-4 items-center'>
                    <label>Discount</label>
                    <InputNumber addonAfter={selectAfter} defaultValue={100} />
                </div>
                <div className='flex gap-x-4 items-center'>
                    <label>Applied Products</label>
                    <Select
                        mode="multiple"
                        style={{ width: '50%' }}
                        placeholder="Select products"/>
                </div>
                <div className='flex flex-col gap-x-4'>
                    <p>Description</p>
                    <Input.TextArea />
                </div>
            </div>
        )}
    </div>
);
}

