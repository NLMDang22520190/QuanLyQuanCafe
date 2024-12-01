import React, { useState, useEffect } from 'react';
import { CircleButton } from '../buttons/CircleButton';

const QuantityField = ({ initialQuantity = 1, min = 1, max = 100, onChange, disabled = false }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        if (onChange) {
            onChange(quantity);
        }
    }, [quantity, onChange]);

    const handleChange = (e) => {
        const value = e.target.value;
        if (!isNaN(value) && value !== '') {
            const numericValue = Math.max(min, Math.min(max, Number(value)));
            setQuantity(numericValue);
        }
    };

    const handleIncrement = () => {
        if (quantity < max) {
            setQuantity(quantity + 1);
        }
    };

    const handleDecrement = () => {
        if (quantity > min) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div className="flex gap-x-2 w-full items-center">
            <CircleButton
                size='small'
                onClick={handleDecrement}
                style="bg-amber-500 rounded-full p-1 w-8 h-8 hover:bg-amber-600 text-white"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                }
            />
            <input type="text" value={quantity} onChange={handleChange} disabled={disabled} className="w-16 text-center bg-transparent border border-amber-500 rounded-md no-spinner appearance-none" />
            <CircleButton
                size='small'
                onClick={handleIncrement}
                style="bg-amber-500 rounded-full p-1 w-8 h-8 hover:bg-amber-600 text-white"
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                }
            />
        </div>
    );
};

export default QuantityField;
