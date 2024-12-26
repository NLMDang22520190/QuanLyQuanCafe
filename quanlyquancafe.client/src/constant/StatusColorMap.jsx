import {Status} from './Status';

const statusColorMap = {
    [Status.Active]: { badgeStyle: 'bg-green-500', textColor: 'text-green-700' },
    [Status.Inactive]: { badgeStyle: 'bg-gray-400', textColor: 'text-gray-600' },
    [Status.Upcoming]: { badgeStyle: 'bg-blue-500', textColor: 'text-blue-700' },
    [Status.Pending]: { badgeStyle: 'bg-gray-500', textColor: 'text-gray-300' },
    [Status.Payed]: { badgeStyle: 'bg-yellow-500', textColor: 'text-yellow-600' },
    [Status.Cancelled]: { badgeStyle: 'bg-red-500', textColor: 'text-red-900' },
    [Status.OutOfStock]: { badgeStyle: 'bg-red-500', textColor: 'text-red-600' },
    [Status.InStock]: { badgeStyle: 'bg-yellow-500', textColor: 'text-yellow-600' },
    [Status.LowStock]: { badgeStyle: 'bg-gray-500', textColor: 'text-gray-300' },
    [Status.InProgress]: { badgeStyle: 'bg-yellow-500', textColor: 'text-yellow-600' },
    [Status.Completed]: { badgeStyle: 'bg-green-500', textColor: 'text-green-700' },
    default: { badgeStyle: 'bg-green-500', textColor: 'text-white' },
};

export { statusColorMap };