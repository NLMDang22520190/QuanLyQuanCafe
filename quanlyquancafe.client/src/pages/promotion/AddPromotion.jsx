import {Input, TimePicker, DatePicker, InputNumber, Select} from 'antd';

export const AddPromotion = () => {

    const selectAfter = (
        <Select defaultValue="USD" style={{ width: 100 }}>
          <Option value="USD">$</Option>
          <Option value="VND">VND</Option>
          <Option value="percentage">%</Option>
        </Select>
      );

return (<div className='flex flex-col gap-y-4'>
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
        <DatePicker/>
    </div>
    
    <div className='flex gap-x-4 items-center'>
        <p>End Time</p>
        <TimePicker />
        <DatePicker/>
    </div>
    <div className='flex gap-x-4 items-center'>
        <label>Discount</label>
        <InputNumber addonAfter={selectAfter} defaultValue={100} />
    </div>

    <div className='flex flex-col gap-x-4'>
        <p>Description</p>
        <Input.TextArea />
    </div>
    
    </div>);
}

