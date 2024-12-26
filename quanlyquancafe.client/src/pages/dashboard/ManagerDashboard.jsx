import { RoundedButton } from "../../components/buttons/RoundedButton"
import { MetricCard } from "../../components/card/MetricCard"
import DoughnutChart from "../../components/chart/DoughnnutChart"
import LineChart from "../../components/chart/LineChart";
import { OverviewTableLayout } from "../../components/tables/OverviewTableLayout";
import { TableDetailType } from "../../constant/TableDetailType";
import { RoundedComboBox } from "../../components/combobox/RoundedComboBox"
import { CircleButton } from "../../components/buttons/CircleButton";
import { OverviewTableLayoutWithTab } from "../../components/tables/OverviewTableLayoutWithTab";
import { useState } from "react";
import { useEffect } from "react";
import { Table } from "antd";
import { Tab } from "@material-tailwind/react";

export const ManagerDashboard = () => {
    const [saleStatistic, setSaleStatistic] = useState();
    const [saleStatisticByMonths, setSaleStatisticByMonths] = useState();
    const [pendingOrders, setPendingOrders] = useState();
    const [shiftStatistic, setShiftStatistic] = useState();
    const [ingredients, setIngredients] = useState();
    const [lineData, setLineData] = useState();
    const [loading, setLoading] = useState(true);
    const [menuItemStatistic, setMenuItemStatistic] = useState();
    const [newestStaffs, setNewestStaffs] = useState();
    const [menuItemTab, setMenuItemTab] = useState(0);

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

    const stockCol = [
        { title: "Ingredient", dataIndex: "ingredientName", key: "ingredientName" },
        { title: "Quantity in stock", dataIndex: "quantityInStock", key: "quantityInStock" },
        { title: "Unit", dataIndex: "unit", key: "unit" },
    ]

    const menuItemCol = [
        { header: "ID", key: "itemId", type: TableDetailType.Info },
        { header: "Name", key: "itemName", type: TableDetailType.Info },
    ]

    const staffCol = [
        { header: "ID", key: "staffId", type: TableDetailType.Info },
        { header: "Name", key: "user", type: TableDetailType.Info },
        { header: "Start Working", key: "dateStartedWorking", type: TableDetailType.Info },
    ]

    const orderCol = [
        { title: "ID", dataIndex: "orderId", key: "orderId" },
        { title: "Time", dataIndex: "orderTime", key: "orderTime" },
        { title: "Payment", dataIndex: "paymentMethod", key: "paymentMethod" },
    ]

    const fetchSaleStatistic = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://localhost:7087/api/reports/sale-statistics");
            const data = await response.json();
            setSaleStatistic(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchSaleStatisticByMonths = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://localhost:7087/api/reports/sale-statistics-by-months");
            const data = await response.json();
            setSaleStatisticByMonths(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchShiftStatistic = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://localhost:7087/api/shifts/statistics");
            const data = await response.json();
            setShiftStatistic(data);
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchIngredientsStock = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://localhost:7087/api/ingredient");
            const data = await response.json();
            setIngredients(data);

            const sortedIngredients = data.sort((a, b) => b.quantityInStock - a.quantityInStock);
            setIngredients(sortedIngredients.slice(0, 5));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchMenuItemStatistic = async () => {    
        setLoading(true);
        try {
            const response = await fetch("https://localhost:7087/api/menu-items/statistics");
            const data = await response.json();
            setMenuItemStatistic(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleLineData = () => {
        setLoading(true);
        setLineData(
            {
                labels: saleStatistic ? saleStatistic.map((item) => item.period) : [],
                period1: {
                    label: 'Total Net Profit',
                    values: saleStatistic ? saleStatistic.map((item) => item.totalNetProfit) : [],
                },
                period2: {
                    label: 'Total Incomes',
                    values: saleStatistic ? saleStatistic.map((item) => item.totalIncome) : [],
                },
            }
        )
        setLoading(false)
    }

    const fetchNewestStaffs = async () => {
        setLoading(true);
        try {
            const response = await fetch("https://localhost:7087/api/staff/newest-staffs/5");
            const data = await response.json();
            setNewestStaffs(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const fetchPendingOrders = async () => {    
        setLoading(true);
        try {
            const response = await fetch("https://localhost:7087/api/orders/pending");
            const data = await response.json();
            setPendingOrders(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSaleStatistic();
        fetchSaleStatisticByMonths();
        fetchShiftStatistic();
        fetchIngredientsStock();
        fetchMenuItemStatistic();
        fetchNewestStaffs();
        fetchPendingOrders();
    }, []);

    useEffect(() => {
        handleLineData();
    }, [saleStatistic]);

    if (loading || !lineData) {
        return (
            <div className="flex justify-center items-center h-full">
               <p>Loading</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-4 overflow-y-auto h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Welcome,</h2>
            </div>

            <div className="flex gap-y-4 max-h-[calc(100vh-180px)]  min-h-[calc(100vh-180px)] w-full gap-x-4">
                <div className="flex h-full flex-col gap-y-4 w-2/3">
                    <div className="flex gap-x-4 px-8 ">
                        <MetricCard 
                        percentage= { saleStatisticByMonths ? ( saleStatisticByMonths[1] && saleStatisticByMonths[1].totalNetProfit !== 0 ? Math.floor( (saleStatisticByMonths[0].totalNetProfit - saleStatisticByMonths[1].totalNetProfit ) * 100 / saleStatisticByMonths[1].totalNetProfit ) : saleStatisticByMonths[0].totalNetProfit ) : 0} 
                        title="Total Net Profit" 
                        value={saleStatisticByMonths ? saleStatisticByMonths[0].totalNetProfit : 0} />
                        
                        <MetricCard
                        percentage= { saleStatisticByMonths ? ( saleStatisticByMonths[1] && saleStatisticByMonths[1].totalIncome !== 0 ? Math.floor( (saleStatisticByMonths[0].totalIncome - saleStatisticByMonths[1].totalIncome ) * 100 / saleStatisticByMonths[1].totalIncome ) : saleStatisticByMonths[0].totalIncome ) : 0} 
                         title="Total Incomes" 
                         value={saleStatisticByMonths ? saleStatisticByMonths[0].totalIncome : 0} />
                        <MetricCard 
                        percentage= { saleStatisticByMonths ? ( saleStatisticByMonths[1] && saleStatisticByMonths[1].totalExpense !== 0 ? Math.floor( (saleStatisticByMonths[0].totalExpense - saleStatisticByMonths[1].totalExpense ) * 100 / saleStatisticByMonths[1].totalExpense ) : saleStatisticByMonths[0].totalExpense ) : 0} 
                        title="Total Expenses" 
                        value={saleStatisticByMonths ? saleStatisticByMonths[0].totalExpense : 0} />
                    </div>

                    <div className="flex gap-x-4 h-3/5">
                        <div className="flex flex-col w-1/2 h-full bg-gray-500/30 rounded-[20px] p-4 shadow-lg">
                            <p className="font-semibold text-xl">Time Chart</p>

                            <DoughnutChart data={{
                                labels: shiftStatistic ? shiftStatistic.map((item) => item.period) : [],
                                values: shiftStatistic ? shiftStatistic.map((item) => item.shiftCount) : [],
                            }} />

                        </div>

                        <div className="flex flex-col w-1/2 h-full bg-gray-500/30 rounded-[20px] p-4 pb-8 shadow-lg">
                            <p className="font-semibold text-xl">New Staff</p>

                            <OverviewTableLayout columns={staffCol} data={newestStaffs} />

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
                        {
                             <LineChart data={lineData ? lineData : []} />
                        }
                    </div>

                </div>


                <div className="flex flex-col h-full gap-y-4">
                    <div className="flex flex-col gap-y-2 bg-gray-500/30 rounded-[20px] p-6 shadow-lg">
                        <p className="font-semibold text-xl">Popularity</p>

                        <OverviewTableLayoutWithTab 
                        tabs={[{ name: "Most sold" }, { name: "Least sold" }]} 
                        onTabChange={(index)=>setMenuItemTab(index)} 
                        columns={menuItemCol} data={menuItemTab == 0 ? (menuItemStatistic?.mostSoldMenuItems ?? []) : (menuItemStatistic?.leastSoldMenuItems ?? [])} />
                    </div>
                    <div className="flex flex-col gap-y-2 bg-gray-500/30 rounded-[20px] p-6 shadow-lg">
                        <p className="font-semibold text-xl">On Transaction</p>
                        <Table columns={orderCol} dataSource={pendingOrders} pagination={false} />
                    </div>
                    <div className="flex flex-col gap-y-2 bg-gray-500/30 rounded-[20px] p-6 shadow-lg">
                        <p className="font-semibold text-xl">Inventory Status</p>
                        <Table loading={!ingredients} className="bg-transparent" columns={stockCol} dataSource={ingredients} pagination={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}