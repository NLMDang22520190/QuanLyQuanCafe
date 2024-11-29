export const CircleButton = ({icon = null, style = "", onClick = () => {}}) => {
    return (
        <div className={`${style} text-amber-500`}>
            <button onClick={onClick}>
            {icon}
            </button>
            
        </div>
    )
}