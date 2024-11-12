import { Checkbox } from "@material-tailwind/react";
import { TableDetailType } from "../../constant/TableDetailType";
import { RoundedTextField } from "../textfields/RoundedTextField";
import { CheckBox } from '../checkboxes/CheckBox';
import { StatusBadge } from "../badges/StatusBadge";
import { useEffect, useState } from "react";
import { CircleButton } from '../buttons/CircleButton'

export const TableLayout = ({ columns = [], data = [] }) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(15)

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const [displayedData, setDisplayedData] = useState(data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage));

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleRowsPerPageChange = (newRowsPerPage) => {
        setRowsPerPage(newRowsPerPage);
        setCurrentPage(1);
    };

    useEffect(() => {
        const newData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
        setDisplayedData(newData);
    }, [currentPage, data, rowsPerPage]);


    return (
        <div className="h-full flex flex-col justify-between">
            <div className="w-full  bg-gray-900 overflow-y-auto scrollbar-hide">
                <table className="table-auto w-full text-left ">
                    <thead className="bg-amber-500 text-black font-normal sticky top-0 z-10">
                        <tr>
                            {columns.map((column, colIndex) => (
                                <th key={colIndex} 
                                className={`px-4 py-2 ${column.type === TableDetailType.Badge ? "text-center" : "text-left"} ${(colIndex === 0) && "rounded-s-md"} ${(colIndex === columns.length - 1) && "rounded-e-md"} `}>
                                    {column.header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="font-light divide-y divide-amber-500 divide-opacity-30">
                        {displayedData.map((row, index) => (
                            <tr key={`row-${index}`}>
                                {columns.map((column, colIndex) => (
                                    column.type === TableDetailType.Badge ? (
                                        <td key={`col-${index}-${colIndex}`} className="flex px-4 py-4 justify-center ">
                                            <StatusBadge label={row[column.key]} status={row[column.key]} />
                                            
                                        </td>
                                    ) : column.type === TableDetailType.TextField ? (
                                        <td key={`col-${index}-${colIndex}`} className="px-4 py-4 justify-items-center">
                                            <RoundedTextField initialValue={row[column.key]} width="100%" />
                                        </td>
                                    ) : column.type === TableDetailType.CheckBox ? (
                                        <td key={`col-${index}-${colIndex}`} className="px-4 py-4 justify-items-center">
                                            <CheckBox />
                                        </td>
                                    ) : column.type === TableDetailType.Action ? (
                                        <td key={`col-${index}-${colIndex}`} className="px-4 py-4 justify-items-center">
                                            <CircleButton icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                            </svg>

                                            } />
                                        </td>
                                    ) : (
                                        <td key={`col-${index}-${colIndex}`} className="px-4 py-4 justify-items-start">
                                        <p>{row[column.key]}</p>
                                        </td>
                                    )

                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>

            <div className="flex flex-col">

                <div className="flex justify-end px-4 mt-2">
                    <div className="flex items-center space-x-2">
                        <label htmlFor="rowsPerPage" className="text-white">Rows per page:</label>
                        <select
                            id="rowsPerPage"
                            value={rowsPerPage}
                            onChange={(e) => handleRowsPerPageChange(parseInt(e.target.value))}
                            className="bg-amber-500 bg-opacity-40 border-amber-500 border-2 text-white rounded px-2 py-1"
                        >
                            {[5, 10, 15, 20].map((num) => (
                                <option key={num} value={num}>{num}</option>
                            ))}
                        </select>
                    </div>
                </div>


                <div className="flex justify-center items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => handlePageChange(i + 1)}
                            className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-amber-500 text-black" : "bg-transparent border-gray-800 border-2 text-white"}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};
