import { RoundedButton } from "../../components/buttons/RoundedButton"
import { MetricCard } from "../../components/card/MetricCard"
import DoughnutChart from "../../components/chart/DoughnnutChart"
import LineChart from "../../components/chart/LineChart";
import { OverviewTableLayout } from "../../components/tables/OverviewTableLayout";
import { TableDetailType } from "../../constant/TableDetailType";
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox"
import { CircleButton } from "../../components/buttons/CircleButton";
import { OverviewTableLayoutWithTab } from "../../components/tables/OverviewTableLayoutWithTab";

export const ManagerDashboard = () => {
    const doughnutChartData = {
        labels: ['6AM-12AM', '12AM-6PM', '6PM-10PM'],
        values: [12, 19, 3],
    };

    const sampleLineData = {
        labels: ['01 Jul', '05 Jul', '10 Jul', '15 Jul', '20 Jul', '25 Jul', '30 Jul'],
        period1: {
            label: 'Current month figure',
            values: [65, 59, 80, 81, 56, 42, 12],
        },
        period2: {
            label: 'Last month figure',
            values: [75, 69, 70, 91, 66, 31, 54],
        },
    };

    const sampleData = [
        {
            id: "ORD001",

            totalAmount: "$25.50",
            status: "Completed",

        },
        {
            id: "ORD002",

            totalAmount: "$50.00",
            status: "Pending",

        },
        {
            id: "ORD003",

            totalAmount: "$15.75",
            status: "Cancelled",

        },
        {
            id: "ORD004",

            totalAmount: "$20.00",
            status: "In Progress",

        },
        {
            id: "ORD005",

            totalAmount: "$40.00",
            status: "Completed",

        },

    ];

    const columnData = [
        { header: "ID", key: "id", type: TableDetailType.Info },

        { header: "Total Amount", key: "totalAmount", type: TableDetailType.Info },
        { header: "Order Status", key: "status", type: TableDetailType.Badge },
    ];


    return (
        <div className="flex flex-col gap-y-4 overflow-y-auto h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Welcome,</h2>

            </div>

            <div className="flex gap-y-4 max-h-[calc(100vh-180px)]  min-h-[calc(100vh-180px)] w-full gap-x-4">
                <div className="flex h-full flex-col gap-y-4 w-2/3">
                    <div className="flex gap-x-4 px-8 ">
                        <MetricCard title="Total Net Profit" />
                        <MetricCard title="Total Orders" />
                        <MetricCard title="Total Expenses" />
                    </div>

                    <div className="flex gap-x-4 h-3/5">
                        <div className="flex flex-col w-1/2 h-full bg-gray-500/30 rounded-[20px] p-4 shadow-lg">
                            <p className="font-semibold text-xl">Time Chart</p>

                            <DoughnutChart data={doughnutChartData} />

                        </div>

                        <div className="flex flex-col w-1/2 h-full bg-gray-500/30 rounded-[20px] p-4 pb-8 shadow-lg">
                            <p className="font-semibold text-xl">Employment Status</p>

                            <OverviewTableLayout columns={columnData} data={sampleData} />

                        </div>
                    </div>

                    <div className="flex flex-col bg-gray-500/30 rounded-[20px] p-6 shadow-lg w-full">
                        <div className="flex justify-between">
                            <p className="font-semibold text-xl">Sale Graph</p>
                            <div className="flex gap-x-4 items-center">
                                <RoundedComboBox options={[{ label: "Feb", value: "Feb" }]} style="rounded-full" width="100px" />
                                <CircleButton icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                                } />
                            </div>
                        </div>
                        <LineChart data={sampleLineData} values />
                    </div>

                </div>


                <div className="flex flex-col h-full gap-y-4">
                    <div className="flex flex-col gap-y-2 bg-gray-500/30 rounded-[20px] p-6 shadow-lg">
                        <p className="font-semibold text-xl">Popularity</p>

                        <OverviewTableLayoutWithTab tabs={[{name: "Most sold dish"}, {name: "Least sold dish"}]} columns={columnData} data={sampleData} />
                    </div>
                    <div className="flex flex-col gap-y-2 bg-gray-500/30 rounded-[20px] p-6 shadow-lg">
                        <p className="font-semibold text-xl">Order & Billing Status</p>
                        <OverviewTableLayoutWithTab tabs={[{name: "Pending"}, {name: "Billed"}]} columns={columnData} data={sampleData} />
                    </div>
                    <div className="flex flex-col gap-y-2 bg-gray-500/30 rounded-[20px] p-6 shadow-lg">
                        <p className="font-semibold text-xl">Inverntory Status</p>
                        <OverviewTableLayoutWithTab tabs={[{name: "In stock"}, {name: "Out stock"}]} columns={columnData} data={sampleData} />                    </div>
                </div>
            </div>


        </div>
    )
}