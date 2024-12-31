import { Table, Button, message } from "antd";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import instance from "../../features/AxiosInstance/AxiosInstance";
import RollCallReport from "./RollCallReport";

const Employee = () => {
  const userId = useSelector((state) => state.auth.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [salaryHistoryData, setSalaryHistoryData] = useState([]);
  const [monthlySalaryData, setMonthlySalaryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [staffId, setStaffId] = useState(null);
  const [totalSalaryRecords, setTotalSalaryRecords] = useState(0);
  const [currentSalaryPage, setCurrentSalaryPage] = useState(1);
  const salaryPageSize = 10;

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

  const fetchStaffId = async () => {
    try {
      const response = await instance.get(`/api/staff/get-staff-id-by-user/${userId}`);
      setStaffId(response.data.staffId);
    } catch (error) {
      console.error("Error fetching staff ID:", error);
      message.error("Failed to fetch staff ID.");
    }
  };

  const fetchHourlyWageHistoryData = async (pageIndex = 1, pageSize = salaryPageSize) => {
    if (!staffId) return;

    try {
      setLoading(true);
      const response = await instance.get(
        `/api/salaries/${staffId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
      );

      if (response.data && response.data.data) {
        const formattedData = response.data.data.map((item) => ({
          date: item.startDate.slice(0, 7), 
          hourlyWage: item.hourWage,
        }));
        setSalaryHistoryData(formattedData);
      } else {
        message.info("No hourly wage history found.");
        setSalaryHistoryData([]);
      }
    } catch (error) {
      console.error("Error fetching hourly wage history:", error);
      message.error("Failed to load hourly wage history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchStaffId();
    }
  }, [userId]);

  useEffect(() => {
    if (staffId) {
      fetchHourlyWageHistoryData(currentSalaryPage, salaryPageSize);
    }
  }, [staffId, currentSalaryPage]);

  return (
    <div>
      <br />
      {/* Hourly Wage History Table */}
      <Table
        columns={hourlyWageHistoryColumns}
        dataSource={salaryHistoryData}
        rowKey="date"
        pagination={{
          current: currentSalaryPage,
          pageSize: salaryPageSize,
          total: totalSalaryRecords,
          onChange: (page) => setCurrentSalaryPage(page),
        }}
        bordered
        title={() => <span className="custom-table-title">Hourly Wage History</span>}
        loading={loading}
      />

      {/* Monthly Salary Table */}
      <Table
        columns={monthlySalaryColumns}
        dataSource={monthlySalaryData}
        rowKey="month"
        pagination={{ pageSize: 10 }}
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
