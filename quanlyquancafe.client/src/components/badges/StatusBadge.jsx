import { Status } from "../../constant/Status";


export const StatusBadge = ({label = "", status = ""}) => {
    let badgeStyle, textColor;

    switch (status) {
        case Status.Pending:
            badgeStyle = 'bg-gray-500';
            textColor = 'text-gray-300';
          break;
        case  Status.Payed:
          badgeStyle = 'bg-yellow-500';
          textColor = 'text-yellow-600';
          break;
        case  Status.Cancelled:
          badgeStyle = 'bg-red-500';
          textColor = 'text-red-900';
          break;
        default:
         
          badgeStyle = 'bg-green-500';
          textColor = 'text-white';
          break;
      }
    return (
        <span
            className={`px-4 py-1 rounded-lg bg-opacity-30 ${badgeStyle} ${textColor}`}
        >
            {label}
        </span>
    )
}