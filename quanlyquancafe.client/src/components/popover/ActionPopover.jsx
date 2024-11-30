import React from 'react';
import { Popover, Button } from 'antd'; 
import { CircleButton } from '../buttons/CircleButton';

export const ActionPopover = ({ actions = [] }) => {
    return (
    <Popover
        placement="bottom"
        content={
            <div>
                {actions.map((action, index) => (
                    <Button key={index} type='link' onClick={action.onClick}>
                        {action.label}
                    </Button>
                ))}
            </div>
        }
        trigger="click"
    >
        <CircleButton icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>} />
    </Popover>
    );
};

