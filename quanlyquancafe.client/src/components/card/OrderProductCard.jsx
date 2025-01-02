import { Button } from "antd"
import {CircleButton}  from "../buttons/CircleButton"

export const OrderProductCard = ({ key="", imageUrl, name, price, inStock = 0, onClickAdd, }) => {

    return (
        <div key={`${key}-product-card`} className="flex gap-x-4 h-min-32 bg-amber-500/10 rounded-lg p-2">
            {imageUrl && <img className="w-20 h-20 rounded-lg" src={imageUrl} alt="Description of image" />}
            <div className="flex flex-col justify-between grow">
                <p className="font-semibold">{name}</p>
                <p>{price}</p>
            </div>
            <div className="flex flex-col justify-between h-full items-end">
                <Button onClick={onClickAdd} shape="circle" type="primary"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                </Button>
            </div>
        </div>
    )
}