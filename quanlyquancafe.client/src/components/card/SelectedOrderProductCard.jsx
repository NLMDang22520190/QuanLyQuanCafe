import { useEffect, useState } from "react"
import {CircleButton} from "../buttons/CircleButton"
import { RoundedTextField } from "../textfields/RoundedTextField"
import QuantityField from "../input_fields/QuantityField";
import { Button, InputNumber } from "antd";
import { use } from "react";

export const SelectedOrderProductCard = ({ key, imageUrl, name, price, onQuantityChange, onRemove }) => {
    const handleChangeQuantity = (value) => {
        onQuantityChange(value)
    }

    return (
        <div key={key} className="flex gap-x-4 bg-gray-900 rounded-lg p-2">
            {imageUrl && <img className="w-20 h-20 rounded-lg" src={imageUrl} alt="Description of image" />}
            <div className="flex flex-col justify-between grow">
                <p className="font-semibold">{name}</p>
                <p>{price}</p>
            </div>
            <div className="flex justify-end gap-x-2 items-end w-1/3">  
                <InputNumber min={1} defaultValue={1} onChange={(value)=>handleChangeQuantity(value)} />
                <Button onClick={onRemove} type="text">Remove</Button>
            </div>
        </div>
    )
}