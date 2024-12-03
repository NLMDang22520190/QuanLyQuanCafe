export const RoundedButton = ({
    prefixIcon = null,
    label = "", 
    width,
    height = "30px",
    paddingX = "10px",
    paddingY = "0px",
    style = "text-black hover:bg-amber-600 bg-amber-500 rounded-sm",
    onClick = () => { } }) => {
    return (
        <div className={`flex items-center justify-center  font-medium gap-x-2  overflow-hidden ${style}`}
            style={{ height }}>

            <button
                onClick={onClick}
                style={{ paddingLeft: paddingX, paddingRight: paddingX, paddingTop: paddingY, paddingBottom: paddingY, width: width || 'fit-content', }}
                className="flex gap-x-2 justify-center">

                {prefixIcon && (
                    <span className="pl-2">
                        {prefixIcon}
                    </span>
                )}
                <p className="text-center">{label}</p>
            </button>
        </div>
    )
}