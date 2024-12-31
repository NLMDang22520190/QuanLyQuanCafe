import { Table, Button } from "antd";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import RollCallReport from "./RollCallReport";

const Employee = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [salaryHistoryData, setSalaryHistoryData] = useState([]);
  const [monthlySalaryData, setMonthlySalaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = useSelector((state) => state.user?.id);

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

  const fetchStaffId = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:7087/api/staff/get-staff-id-by-user/${userId}`);
      const staffId = response.data.staffId;
      fetchSalaryData(staffId);
    } catch (error) {
      console.error("Error fetching staff ID:", error);
    }
  };

  const fetchSalaryData = async (staffId) => {
    setLoading(true); 
    try {
      const [hourlyResponse, monthlyResponse] = await Promise.all([
        axios.get(`https://localhost:7087/api/salaries/${staffId}?pageIndex=1&pageSize=10`),
        axios.get(`https://localhost:7087/api/month-salary/${staffId}?pageIndex=1&pageSize=10`),
      ]);

      setSalaryHistoryData(hourlyResponse.data.data || []);
      setMonthlySalaryData(monthlyResponse.data.data || []);
    } catch (error) {
      console.error("Error fetching salary data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStaffId(userId); 
    }
  }, [userId]);

 
  if (!userId) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br />
      {/* Hourly Wage History Table */}
      <Table
        columns={hourlyWageHistoryColumns}
        dataSource={salaryHistoryData}
        rowKey="date"
        pagination={3}
        bordered
        title={() => <span className="custom-table-title">Hourly Wage History</span>}
        loading={loading}
      />

      {/* Monthly Salary Table */}
      <Table
        columns={monthlySalaryColumns}
        dataSource={monthlySalaryData}
        rowKey="month"
        pagination={3}
        bordered
        title={() => <span className="custom-table-title">Monthly Salary</span>}
        loading={loading}
      />

      {/* Roll Call Report Modal */}
      <RollCallReport
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        monthData={selectedMonth}
      />
    </div>
  );
};

export default Employee;
