import { Modal, Table, Input, Button, Form, DatePicker, message, Card } from "antd";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./user.css";

const StaffDetail = ({ staff, visible, onCancel, isFormer }) => {
  if (!staff) return null; // Tránh render nếu không có staff

  const [salaryHistoryData, setSalaryHistoryData] = useState(staff.hourlyWageHistory || []);
  const [monthlySalaryData, setMonthlySalaryData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [hourlyWage, setHourlyWage] = useState("");
  const [loading, setLoading] = useState(false);

  const hourlyWageHistoryColumns = [
    { title: "Start Date", dataIndex: "date", key: "date" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage" },
  ];

  const monthlySalaryColumns = [
    { title: "Month", dataIndex: "month", key: "month" },
    { title: "Hours Worked", dataIndex: "hoursWorked", key: "hoursWorked" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage", render: (value) => (value !== "N/A" ? `$${value}` : value) },
    {
      title: "Total Salary",
      dataIndex: "totalSalary",
      key: "totalSalary",
      render: (value) => (value !== "N/A" ? `$${value}` : value),
    },
  ];
  


  const fetchHourlyWageHistoryData = async (pageIndex = 1, pageSize = 2) => {
    try {
      setLoading(true);
      setSalaryHistoryData([]);
      const response = await axios.get(
        `https://localhost:7087/api/salaries/${staff.staffId}?pageIndex=1&pageSize=10`
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


  const fetchMonthlySalaryData = async () => {
    try {
      setLoading(true);
      const [monthlyResponse, statisticsResponse] = await Promise.all([
        axios.get(`https://localhost:7087/api/month-salary/${staff.staffId}?pageIndex=1&pageSize=10`),
        axios.get("https://localhost:7087/api/month-salary/statistics"),
      ]);
      const monthlyData = monthlyResponse.data.data;
      const statisticsData = statisticsResponse.data;
  
      // Kết hợp dữ liệu
        const combinedData = monthlyData.map((item) => {
          const stats = statisticsData.find((stat) => stat.month === item.month);
          return {
            month: item.month,
            hoursWorked: item.totalHours || 0,
            hourlyWage: stats ? (stats.totalSalaryPayed / stats.totalHours).toFixed(2) : "N/A",
            totalSalary: stats ? stats.totalSalaryPayed : "N/A",
          };
        });

        setMonthlySalaryData(combinedData);
      } catch (error) {
        console.error("Error fetching monthly salary data:", error);
        message.error("Failed to load monthly salary data.");
      } finally {
        setLoading(false);
      }
  };
  

  useEffect(() => {
    if (visible && staff.staffId) {
      fetchHourlyWageHistoryData();
      fetchMonthlySalaryData();
    }
  }, [visible, staff.staffId]);

  const handleSubmit = async () => {
    const currentDate = new Date();

    if (!startDate || startDate < currentDate) {
      message.error("Start date must be this month or in the future.");
      return;
    }

    if (isNaN(hourlyWage) || hourlyWage <= 0) {
      message.error("Hourly wage must be a positive number.");
      return;
    }

    try {
      const payload = {
        staffId: staff.staffId,
        hourWage: parseFloat(hourlyWage),
        startDate: startDate.format("YYYY-MM-DD"), 
      };

      const response = await axios.post("https://localhost:7087/api/salaries", payload);

      if (response.status === 201) {
        const newSalaryData = {
          date: startDate.format("YYYY-MM"),
          hourlyWage: payload.hourWage,
        };

        setSalaryHistoryData([...salaryHistoryData, newSalaryData]);
        setStartDate(null);
        setHourlyWage("");
        message.success("Hourly wage history added successfully.");
      } else {
        message.error("Failed to add hourly wage history.");
      }
    } catch (error) {
      console.error("Error adding hourly wage history:", error);
      message.error("An error occurred while adding hourly wage history.");
    }
  };

  return (
    <Modal
      title={`Staff Details - ${staff.staffId} - ${staff.name} - ${staff.email}`}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <br />

        {/* Form for adding hourly wage history */}
        {!isFormer && (
          <Card>
            <Form layout="horizontal" size="medium">
              <Form.Item label="Start Date" style={{ marginRight: 10 }}>
                <DatePicker
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  picker="month"
                  format="YYYY-MM"
                />
              </Form.Item>

              <Form.Item label="Hourly Wage" style={{ marginRight: 10 }}>
                <Input
                  type="number"
                  value={hourlyWage}
                  onChange={(e) => setHourlyWage(e.target.value)}
                  prefix={<svg width="0" height="0" />}
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" onClick={handleSubmit}>
                  Add new Hourly Wage
                </Button>
              </Form.Item>
            </Form>
          </Card>
        )}

        <br />

        {/* Hourly Wage History Table */}
        <Table
          columns={hourlyWageHistoryColumns}
          dataSource={salaryHistoryData}
          rowKey="date"
          pagination={{
            pageSize: 2, // Số mục mỗi trang
            onChange: (pageIndex, pageSize) => {
              // Gọi lại API mỗi khi chuyển trang
              fetchHourlyWageHistoryData(pageIndex, pageSize);
            },
          }}
          bordered
          title={() => <span className="custom-table-title">Hourly Wage History</span>}
        />

        {/* Monthly Salary Table */}
        <Table
          columns={monthlySalaryColumns}
          dataSource={monthlySalaryData}
          rowKey="month"
          loading={loading}
          pagination={{ pageSize: 2 }}
          bordered
          title={() => <span className="custom-table-title">Monthly Salary</span>}
        />
      </div>
    </Modal>
  );
};

export default StaffDetail;
