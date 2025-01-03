import { Button } from "antd"
import {CircleButton}  from "../buttons/CircleButton"

export const OrderProductCard = ({ key="", imageUrl, name, price, inStock = 0, onClickAdd, }) => {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div key={`${key}-product-card`} className="flex gap-x-4 h-min-32 bg-amber-500/10 rounded-lg p-2">
            <img className="w-16 h-16 rounded-lg" src={imageUrl} alt="Description of image" />
            <div className="flex flex-col justify-between grow">
                <p className="font-semibold">{name}</p>
                <p>{formatPrice(price)}</p>
            </div>
            <div className="flex flex-col h-full justify-end gap-y-2 items-end">
                <Button onClick={onClickAdd} variant="text" shape="circle"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </Button>
            </div>
        </div>
    )
}