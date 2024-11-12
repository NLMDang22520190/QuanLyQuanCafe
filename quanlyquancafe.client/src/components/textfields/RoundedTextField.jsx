import { useState } from "react"


export const RoundedTextField = ({initialValue = "",prefixIcon = null, placeholder = "", width = "300px", height = "30px", textColor="text-white", onValueChange}) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (onValueChange) {
            onValueChange(newValue); 
        } 
      };

    return (
        <div className={`flex items-center border border-amber-500 rounded-sm overflow-hidden bg-transparent ${textColor}`}
        style={{ width, height }}>
                {prefixIcon && (
                    <span className="pl-2">
                        {prefixIcon}
                    </span>
                )}
                <input
                    type="text"
                    value={value} 
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={`flex-1 px-4 py-2 bg-transparent border-0 border-transparent focus:outline-none  ${prefixIcon ? "" : "pl-4"}`}
                />
            </div>
    )
    }