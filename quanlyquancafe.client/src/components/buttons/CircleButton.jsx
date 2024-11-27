export const CircleButton = ({icon = null, style = "", onClick = () => {}, size = "medium"}) => {
    const sizeClasses = {
        small: "w-6 h-6",
        medium: "w-8 h-8",
        large: "w-10 h-10"
    };

    return (
        <div className={`${style} ${sizeClasses[size]} text-amber-500 flex items-center justify-center`}>
            <button onClick={onClick} className="w-full h-full rounded-full flex items-center justify-center">
                {icon}
            </button>
        </div>
    )
}