import { Modal, Table, Input, Button, Form, DatePicker, message, Card } from "antd";
import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./user.css";
import instance from "../../features/AxiosInstance/AxiosInstance";

const StaffDetail = ({ staff, visible, onCancel, isFormer }) => {
  if (!staff) return null; 

  const [salaryHistoryData, setSalaryHistoryData] = useState(staff.hourlyWageHistory || []);
  const [monthlySalaryData, setMonthlySalaryData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [hourlyWage, setHourlyWage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalRecords, setTotalRecords] = useState(0); 


  const hourlyWageHistoryColumns = [
    { title: "Start Date", dataIndex: "date", key: "date" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage" },
  ];

  const monthlySalaryColumns = [
    {
    title: "Month",
    dataIndex: "month",
    key: "month",
    render: (_, record) => `${record.month}`,
    },
    { title: "Hours Worked", dataIndex: "hoursWorked", key: "hoursWorked" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage", render: (value) => (value !== "N/A" ? `$${value}` : value) },
    {
      title: "Total Salary",
      dataIndex: "totalSalary",
      key: "totalSalary",
      render: (value) => (value !== "N/A" ? `$${value}` : value),
    },
  ];
  


  const fetchHourlyWageHistoryData = async (pageIndex = 1, pageSize = 10) => {
    try {
      setLoading(true);
      setSalaryHistoryData([]);
      const response = await instance.get(
        `/api/salaries/${staff.staffId}?pageIndex=1&pageSize=10`
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


  const fetchMonthlySalaryData = async (pageIndex = 1, pageSize = 10) => {
    if (!staff || !staff.staffId) {
        console.error("Invalid staff ID.");
        message.error("Staff information is missing or invalid.");
        return;
    }
    try {
        setLoading(true);
        setMonthlySalaryData([]);
        const response = await instance.get(
            `/api/month-salary/Staff/${staff.staffId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
        );

        if (response.status === 200 || response.status === 201) {
            const monthlyData = response.data.data;
            const formattedData = monthlyData.map((item) => ({
                month: item.month,
                hoursWorked: item.totalHours || 0,
                hourlyWage: item.hourWage || 0,
                totalSalary: (item.totalHours * item.hourWage).toFixed(2),
            }));

            setMonthlySalaryData(formattedData);

            setCurrentPage(response.data.currentPage || pageIndex);
            setTotalRecords(response.data.totalRecords || 0);
        } else {
            console.error("Error fetching monthly salaries:", response.statusText);
            message.error("Failed to fetch monthly salary data.");
        }
    } catch (error) {
        console.error("Error fetching monthly salary data:", error);
        message.error("An error occurred while fetching monthly salary data.");
    } finally {
        setLoading(false);
    }
};


  useEffect(() => {
    if (visible && staff.staffId) {
      fetchHourlyWageHistoryData();
      fetchMonthlySalaryData();
    }
  }, [visible, staff]);

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

      const response = await instance.post(`/api/salaries`, payload);

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
            pageSize: 2, 
            onChange: (pageIndex, pageSize) => {
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
          pagination={{
            current: currentPage, 
            pageSize: 5, 
            total: totalRecords, 
            onChange: (page) => fetchMonthlySalaryData(page, 5), 
          }}
          bordered
          title={() => <span className="custom-table-title">Monthly Salary</span>}
        />
      </div>
    </Modal>
  );
};

export default StaffDetail;