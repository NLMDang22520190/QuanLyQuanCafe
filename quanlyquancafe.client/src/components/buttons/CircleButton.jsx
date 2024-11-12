export const CircleButton = ({icon = null, style = "", onClick = () => {}}) => {
    return (
        <div className={style}>
            <button onClick={onClick}>
            {icon}
            </button>
            
        </div>
    )
}