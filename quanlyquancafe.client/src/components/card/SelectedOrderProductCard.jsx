import { Form } from "antd";
import { Button, InputNumber } from "antd";
import { use } from "react";

export const SelectedOrderProductCard = ({ key, imageUrl, name, price, onQuantityChange, onRemove }) => {
    const handleChangeQuantity = (value) => {
        onQuantityChange(value)
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    }

    return (
        <div key={key} className="flex gap-x-4 bg-amber-500/10 h-20 items-center rounded-lg p-2 mt-2 py-4">
            <img className="w-16 h-16 rounded-lg" src={imageUrl} alt="Description of image" />
            <div className="flex flex-col grow gap-4">
                <div className="flex justify-between grow">
                    <p className="font-semibold">{name}</p>
                    <p>{formatPrice(price)}</p>
                </div>
                <div className="flex gap-x-2 gap-4 items-center justify-between">
                    <div className="flex gap-x-2 gap-4 items-center justify-between">
                        <p>Qty:</p>
                        <InputNumber name="quantity" defaultValue={1} min={1} onChange={(value) => handleChangeQuantity(value)} />
                    </div>
                    <Button onClick={onRemove} type="text">Remove</Button>
                </div>
            </div>
        </div>
    )
}