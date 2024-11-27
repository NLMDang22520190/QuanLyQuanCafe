import React, { useState } from 'react';
import Modal from 'react-modal';
import { RoundedButton } from '../../../components/buttons/RoundedButton';
import { RoundedTextField } from '../../../components/textfields/RoundedTextField';

const CreateCategory = ({ isOpen, closeModal }) => {

    const handleCancel = () => {
        closeModal();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Create Category Modal"
            className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="flex flex-col bg-black p-6 gap-y-4 rounded-lg shadow-lg text-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                <div className='flex justify-between'>
                    <h1 className="text-2xl font-bold text-center">Create Category</h1>
                    <button onClick={closeModal} className="absolute top-2 right-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className='flex flex-col gap-y-6 w-full '>
                    <RoundedTextField width='100%' placeholder='Category Name' label="Name"/>
                    <RoundedTextField width='100%' placeholder='(Optional) Description' height='100px' label="Description"/>
                </div>
                <div className='w-1/3 flex gap-x-4'>
                    <RoundedButton paddingY='5px' label='Save'/>
                    <RoundedButton onClick={handleCancel} paddingY='5px' label='Cancel'/>
                </div>
            </div>
        </Modal>
    );
};

export default CreateCategory;
