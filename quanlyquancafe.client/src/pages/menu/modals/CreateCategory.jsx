import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const CreateCategory = () => {

    return (
       
            <div className='flex flex-col gap-y-6 w-full'>
                <Input placeholder='Category Name' />
                <Input.TextArea placeholder='(Optional) Description' rows={4} />
            </div>
    
    );
};

export default CreateCategory;
