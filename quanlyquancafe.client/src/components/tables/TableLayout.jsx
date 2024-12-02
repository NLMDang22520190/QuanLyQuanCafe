import { Table, Pagination, Select, Badge, Input, } from 'antd';
import { TableDetailType } from "../../constant/TableDetailType";
import { useEffect, useState } from "react";
import { CircleButton } from "../buttons/CircleButton";
import { CheckSlider } from "../checkboxes/CheckSlider";
import { StatusBadge } from '../badges/StatusBadge';
import { Popover, Button, InputNumber, Switch, Checkbox } from 'antd';
import {ActionPopover} from '../popover/ActionPopover';

const { Option } = Select;

export const TableLayout = ({ columns = [], data = [], pageLayout = true, hideHeader = false }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(pageLayout ? 15 : data.length);

    const totalPages = Math.ceil(data.length / rowsPerPage);
    const currentData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const [displayedData, setDisplayedData] = useState(currentData);

    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setRowsPerPage(pageSize);
    };

    useEffect(() => {
        const newData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
        setDisplayedData(newData);
    }, [currentPage, data, rowsPerPage]);

    const antdColumns = columns.map((column) => {
        const columnConfig = {
            title: column.header,
            dataIndex: column.key,
            key: column.key,
            render: (text, row) => {
                switch (column.type) {
                    case TableDetailType.Badge:
                        return <StatusBadge label={row[column.key]} status={row[column.key]} />;
                    case TableDetailType.TextField:
                        return <Input defaultValue={row[column.key]} />;
                    case TableDetailType.CheckBox:
                        return <Checkbox />;
                    case TableDetailType.Action:
                       
                        return <ActionPopover actions={column.actions} />;
               
                    case TableDetailType.NumberField:
                        return <InputNumber defaultValue={row[column.key]} />;
                    case TableDetailType.ComboBox:
                        return (
                            <Select defaultValue={row[column.key]} style={{ width: '100%' }}>
                                {column.options.map((option) => (
                                    <Option key={option.label} value={option.value}>{option.label}</Option>
                                ))}
                            </Select>
                        );
                    case TableDetailType.CheckSlider:
                        return <Switch defaultChecked={row[column.key]} />;
                    default:
                        return <p>{row[column.key]}</p>;
                }
            }
        };

        if (column.type !== TableDetailType.CheckBox && column.type !== TableDetailType.Action) {
            columnConfig.sorter = (a, b) => {
                if (typeof a[column.key] === 'number' && typeof b[column.key] === 'number') {
                    return a[column.key] - b[column.key];
                }
                if (typeof a[column.key] === 'string' && typeof b[column.key] === 'string') {
                    return a[column.key].localeCompare(b[column.key]);
                }
                return 0;
            };
        }

        return columnConfig;
    });

    return (
        <div className="h-full flex flex-col">
            <div className="flex-grow overflow-auto">
                <Table
                    columns={antdColumns}
                    dataSource={displayedData}
                    pagination={false}
                    rowKey={(record) => record.id}
                    sticky
                />
            </div>
            <div className="flex justify-between items-center mt-2 px-2">
                <div></div> {/* Empty div to push pagination to center */}
                <Pagination
                    current={currentPage}
                    total={data.length}
                    pageSize={rowsPerPage}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
                <div className="flex items-center">
                    <Select
                        value={rowsPerPage}
                        onChange={(value) => handlePageChange(1, value)}
                        style={{ width: 'auto' }}
                    >
                        <Option value={5}>5</Option>
                        <Option value={10}>10</Option>
                        <Option value={15}>15</Option>
                        <Option value={20}>20</Option>
                        <Option value={50}>50</Option>
                    </Select>
                    <span className="ml-2">/ per page</span>
                </div>
            </div>
        </div>
    );
};



