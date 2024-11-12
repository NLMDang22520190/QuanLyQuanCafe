import { RoundedButton } from "../../components/buttons/RoundedButton"
import {MetricCard} from "../../components/card/MetricCard"

export const ManagerDashboard = () => {
    return (
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Welcome,</h2>
            
            </div>

            <div className="flex max-h-[calc(100vh-180px)]  min-h-[calc(100vh-180px)] w-full gap-x-4">
               <div className="flex gap-x-4 px-8">
                <MetricCard title="Total Net Profit"/> 
                <MetricCard title="Total Orders"/>
                <MetricCard title="Total Expenses"/>
               </div>
            </div>
        </div>
    )
}