import { useState } from "react"
import { CircleButton } from "../buttons/CircleButton"
import { RoundedTextField } from "../textfields/RoundedTextField"

export const SelectedOrderProductCard = ({ key, imageUrl, name, price, inStock = 0 }) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div key={key} className="flex gap-x-4 bg-gray-900 rounded-lg p-2">
            {imageUrl && <img className="w-20 h-20 rounded-lg" src={imageUrl} alt="Description of image" />}
            <div className="flex flex-col justify-between grow">
                <p className="font-semibold">{name}</p>
                <p>{price}</p>
            </div>
            <div className="flex flex-col justify-end items-end">
                <div className="flex">
                <CircleButton 
                onClick={() => setQuantity(quantity-1)} 
                style="bg-amber-500 rounded-full p-1 w-8 h-8 hover:bg-amber-600 text-white" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
              </svg>              
                } />
                <RoundedTextField onValueChange={(value) => setQuantity(value)} 
                width="40px"/>
                <CircleButton 
                onClick={() => setQuantity(quantity+1)} 
                style="bg-amber-500 rounded-full p-1 w-8 h-8 hover:bg-amber-600 text-white" 
                icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                } />
                </div>
               
            </div>
        </div>
    )
}