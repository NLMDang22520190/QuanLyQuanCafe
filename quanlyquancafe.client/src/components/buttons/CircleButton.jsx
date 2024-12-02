import { Button } from 'antd';

export const CircleButton = ({ icon = null, style = "border-0", onClick = () => {}, size = "medium" }) => {
    const sizeClasses = {
        small: `width: 24px; height: 24px;`,
        medium: `width: 32px; height: 32px;`,
        large: `width: 40px; height: 40px;`
    };

    return (
        <Button
            onClick={onClick}
            className={`${style} ${sizeClasses[size]} text-amber-500 flex items-center justify-center rounded-full`}
            icon={icon}
            shape="circle"
        />
    );
};