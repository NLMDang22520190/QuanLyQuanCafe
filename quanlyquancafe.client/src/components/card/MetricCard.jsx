export const MetricCard = ({
    title,
    value = "0.00",
    percentage = "0.00",
    icon,
    isPositive = true }) => {
    return (
        <div className="flex bg-gray-500/30 rounded-[20px] h-fit p-6 shadow-lg w-fit">
            <div className="flex-auto">
                <h3 className="text-lg text-amber-500 font-medium">{title}</h3>
                <div className="items-center justify-between mt-2">
                    <span className="text-3xl font-bold">{value}</span>
                    <div className="flex items-center mt-2 gap-x-2">
                        <div className={`flex ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                            </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
                              </svg>
                              
                            }

                            <span className="text-sm font-medium">{isPositive ? '+' : '-'}{percentage}%</span>

                        </div>
                        <p className="text-sm">more than last month</p>
                    </div>

                </div>

            </div>

        </div>


    );
};
