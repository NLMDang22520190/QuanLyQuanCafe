export const FullRoundedTextField = ({prefixIcon = null, placeholder = "", width = "300px", height = "30px"}) => {
return (
    <div className="flex items-center border border-amber-500 rounded-full text-gray-500 overflow-hidden bg-transparent"
    style={{ width, height }}>
            {prefixIcon && (
                <span className="pl-2">
                    {prefixIcon}
                </span>
            )}
            <input
                type="text"
                placeholder={placeholder}
                className={`flex-1 px-4 py-4 bg-transparent border-0 border-transparent focus:outline-none  ${prefixIcon ? "" : "pl-4"}`}
            />
        </div>
)
}