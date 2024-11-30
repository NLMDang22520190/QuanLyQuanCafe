import { useState } from "react";

export const RoundedComboBox = ({
    initialValue,
    options = [],
    prefixIcon = null,
    placeholder = "",
    width = "300px",
    height = "30px",
    textColor = "text-white",
    onValueChange,
    style = "rounded-sm",
    label,
}) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <div className="flex flex-col gap-y-2">
            {label && <p className={`mb-1-${textColor}`}>{label}</p>}
            <div
            className={`flex items-center pr-4 border border-amber-500 overflow-hidden bg-transparent ${textColor}  ${style}`}
            style={{ width, height }}
        >
            
            {prefixIcon && <span className="pl-2">{prefixIcon}</span>}
            <select
                value={value}
                onChange={handleChange}
                className={`flex-1 bg-transparent border-none focus:outline-none ${prefixIcon ? "pl-2" : "pl-4"} text-white`}
            >
                {placeholder && (
                    <option value="" disabled>
                        {placeholder}
                    </option>
                )}
                {options.map((option, index) => (
                    <option key={index} value={option.value}
                    className="bg-gray-700 text-white hover:bg-gray-600 focus:bg-gray-500"
                    >
                        
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
        </div>
       
    )
}


