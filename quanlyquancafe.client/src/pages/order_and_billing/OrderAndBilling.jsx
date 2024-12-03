import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton"
import { TableLayout } from "../../components/tables/TableLayout"
import { RoundedTextField } from "../../components/textfields/RoundedTextField"
import { TableDetailType } from "../../constant/TableDetailType";

export const OrderAndBilling = () => {
    const navigate = useNavigate();

    const sampleData = [
        {
            id: "ORD001",
            dateAndTime: "2024-11-12 14:30",
            orderDetail: "Toothpaste x 2, Shampoo x 1",
            totalAmount: "$25.50",
            status: "Completed",
            action: "View Details",
        },
        {
            id: "ORD002",
            dateAndTime: "2024-11-12 15:00",
            orderDetail: "Rice x 1, Chicken x 2",
            totalAmount: "$50.00",
            status: "Pending",
            action: "View Details",
        },
        {
            id: "ORD003",
            dateAndTime: "2024-11-12 16:00",
            orderDetail: "Milk x 3, Bread x 1, Butter x 2",
            totalAmount: "$15.75",
            status: "Cancelled",
            action: "View Details",
        },
        {
            id: "ORD004",
            dateAndTime: "2024-11-13 09:00",
            orderDetail: "Washing Powder x 1, Soap x 2",
            totalAmount: "$20.00",
            status: "In Progress",
            action: "View Details",
        },
        {
            id: "ORD005",
            name: "2024-11-13 11:30",
            orderDetail: "Cereal x 1, Oatmeal x 1, Honey x 1",
            totalAmount: "$40.00",
            status: "Completed",
            action: "View Details",
        },
        {
            id: "ORD006",
            dateAndTime: "2024-11-13 13:45",
            orderDetail: "Potatoes x 5, Onion x 2",
            totalAmount: "$12.00",
            status: "Completed",
            action: "View Details",
        },
        {
            id: "ORD007",
            dateAndTime: "2024-11-14 10:00",
            orderDetail: "Eggs x 12, Bacon x 1",
            totalAmount: "$30.00",
            status: "Pending",
            action: "View Details",
        },
        {
            id:  "ORD008",
            dateAndTime: "2024-11-14 11:00",
            orderDetail: "Apple x 6, Orange x 4, Banana x 5",
            totalAmount: "$18.50",
            status: "In Progress",
            action: "View Details",
        },
        {
            id:  "ORD009",
            dateAndTime: "2024-11-14 13:00",
            orderDetail: "Pasta x 2, Tomato Sauce x 1",
            totalAmount: "$22.75",
            status: "Completed",
            action: "View Details",
        },
        {
            id: "ORD010",
            dateAndTime: "2024-11-15 10:00",
            orderDetail: "Chicken x 3, Carrots x 1",
            totalAmount: "$35.00",
            status: "Pending",
            action: "View Details",
        },
    ];
    


  

    const columnData = [
        { header: "", key: "id", type: TableDetailType.CheckBox },
        { header: "Order ID", key: "id", type: TableDetailType.Info },
        { header: "Date & Time", key: "dateAndTime", type: TableDetailType.Info },
        { header: "Order", key: "orderDetail", type: TableDetailType.Info },
        { header: "Total Amount", key: "totalAmount", type: TableDetailType.Info },
        { header: "Order Status", key: "status", type: TableDetailType.Badge },
        {header: "", key: "action", type: TableDetailType.Action}
        
    ];

    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Order & Billing</h2>
                <div className="flex gap-x-2">
                    <RoundedTextField
                        textColor="text-gray-500"
                        placeholder="Search order..."
                        height="40px"
                        width="250px"
                        prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        } />

                    <RoundedButton prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    } height="40px" label="Export Order Report" />
                    <RoundedButton onClick={() => navigate("/orderAndBilling/create")} prefixIcon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    }
                        height="40px"
                        label="Create New Order" />
                </div>
            </div>
            <div className=" max-h-[calc(100vh-200px)]  min-h-[calc(100vh-200px)]">
                <TableLayout
                    columns={columnData}
                    data={sampleData}
                />
            </div>




        </div>
    )
}