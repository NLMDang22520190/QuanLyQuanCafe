
// import { useState, useEffect } from "react"


// export const RoundedTextField = ({initialValue = "",label , style = "border-amber-500 rounded-sm border-amber-500 rounded-sm" ,prefixIcon = null, placeholder = "", width = "300px", height = "30px", textColor="white", onValueChange,  readOnly = false,}) => {
//     const [value, setValue] = useState(initialValue)

//     useEffect(() => {
//         setValue(initialValue);
//     }, [initialValue]);

//     const handleChange = (e) => {
//         if (readOnly) return;
//         const newValue = e.target.value;
//         setValue(newValue);
//         if (onValueChange) {
//             onValueChange(newValue); 
//         } 
//       };

//     return (
//         <div className="flex flex-col gap-y-2">
//             {label && <p className={`text-${textColor}`}>{label}</p>}
//             <div className={`flex items-center border overflow-hidden text-${textColor} ${style}`}
       
//        style={{ width, height }}>
//                {prefixIcon && (
//                    <span className="pl-2">
//                        {prefixIcon}
//                    </span>
//                )}
              
//                <input
//                    type="text"
//                    value={value} 
//                    onChange={handleChange}
//                    placeholder={placeholder}
//                    readOnly={readOnly}
//                    className={`flex-1 px-4 py-2 bg-transparent border-0 border-transparent focus:outline-none  ${prefixIcon ? "" : "pl-4"}`}
//                />
//            </div>

//         </div>
        
//     )
//     }


export const RoundedTextField = ({
    value, 
    onValueChange, 
    label,
    style = "border-amber-500 rounded-sm",
    prefixIcon = null,
    placeholder = "",
    width = "300px",
    height = "30px",
    textColor = "white",
    readOnly = false,
}) => {
    const handleChange = (e) => {
        if (readOnly) return;
        const newValue = e.target.value;
        if (onValueChange) {
            onValueChange(newValue); 
        }
    };

    return (
        <div className="flex flex-col gap-y-2">
            {label && <p className={`text-${textColor}`}>{label}</p>}

            <div
                className={`flex items-center border overflow-hidden text-${textColor} ${style}`}
                style={{ width, height }}
            >
                {prefixIcon && <span className="pl-2">{prefixIcon}</span>}
                <input
                    type="text"
                    value={value} 
                    onChange={handleChange}
                    placeholder={placeholder}
                    readOnly={readOnly}
                    className={`flex-1 px-4 py-2 bg-transparent border-0 border-transparent focus:outline-none ${
                        prefixIcon ? "" : "pl-4"
                    }`}
                />
            </div>
        </div>
    );
};
