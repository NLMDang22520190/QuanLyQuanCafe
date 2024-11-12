export const RoundedButton = ({prefixIcon = null, label = "", width = "300px", height = "30px", paddingX = "10px"}) => {
    return (
        <div className="flex items-center justify-center text-black w-fit font-medium gap-x-2 rounded-sm overflow-hidden bg-amber-500 hover:bg-amber-600" 
        style={{ height }}>
               
                <button 
                style={{paddingLeft: paddingX, paddingRight: paddingX}}
                className="flex gap-x-2">

                {prefixIcon && (
                    <span className="pl-2">
                        {prefixIcon}
                    </span>
                )}
                <p>{label}</p>
                </button>
            </div>
    )
    }