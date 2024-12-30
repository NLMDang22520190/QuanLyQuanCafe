import {  Table, Input, Button, Form, DatePicker, message ,Card } from "antd";
import { useState } from "react";
import RollCallReport from "./RollCallReport";
const Employee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  
  const [staff,setStaff]=useState({
    id: "S001",
    name: "Tom Brown",
    email: "tom@example.com",
    hourlyWage: "$15",
    status: "Active",
    hourlyWageHistory: [
      { date: "2024-01", hourlyWage: "$14" },
      { date: "2024-02", hourlyWage: "$15" },
    ],
    monthlyWage: [
      { month: "January",year:"2024", hoursWorked: 160, hourlyWage: "$14", totalSalary: "$2240" },
      { month: "February",year:"2024", hoursWorked: 160, hourlyWage: "$15", totalSalary: "$2400" },
    ],
  })  

  const [salaryHistoryData, setSalaryHistoryData] = useState(staff.hourlyWageHistory);
  const [monthlySalaryData, setMonthlySalaryData] = useState(staff.monthlyWage);

  const [startDate, setStartDate] = useState(null);
  const [hourlyWage, setHourlyWage] = useState("");

  const hourlyWageHistoryColumns = [
    { title: "Start Date", dataIndex: "date", key: "date" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage" },
  ];

  const monthlySalaryColumns = [
    {
        title: "Month",
        dataIndex: "month",
        key: "month",
        render: (_, record) => `${record.month}, ${record.year}`, 
    },
    { title: "Hours Worked", dataIndex: "hoursWorked", key: "hoursWorked" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage" },
    { title: "Total Salary", dataIndex: "totalSalary", key: "totalSalary" },
    {
        title: "",
        key: "action",
        render: (_, record) => (
          <Button
            type="default"
            onClick={() => {
              setSelectedMonth(record);
              setIsModalVisible(true);
            }}
          >
            Roll Call Report
          </Button>
        ),
      },
  ];



  return (

      <div>
        <br></br>
        <Table
          columns={hourlyWageHistoryColumns}
          dataSource={salaryHistoryData}
          rowKey="date"
          pagination={3}
          bordered
          title={() => <span className="custom-table-title">Hourly Wage History</span>}
        />

        {/* Monthly Salary Table */}
        <Table
          columns={monthlySalaryColumns}
          dataSource={monthlySalaryData}
          rowKey="month"
          pagination={3}
          bordered
          
          title={() => <span className="custom-table-title">Monthly Salary</span>}
        />
        <RollCallReport
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            monthData={selectedMonth}
        />
      </div>
  );
};

export default Employee;
