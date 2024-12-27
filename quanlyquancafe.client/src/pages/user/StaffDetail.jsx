import { Modal, Table, Input, Button, Form, DatePicker, message ,Card } from "antd";
import { useState } from "react";
import "./user.css";

const StaffDetail = ({ staff, visible, onCancel, isFormer }) => {
  if (!staff) return null;  // Tránh render nếu không có staff

  const [salaryHistoryData, setSalaryHistoryData] = useState(staff.hourlyWageHistory);
  const [monthlySalaryData, setMonthlySalaryData] = useState(staff.monthlyWage);

  const [startDate, setStartDate] = useState(null);
  const [hourlyWage, setHourlyWage] = useState("");

  const hourlyWageHistoryColumns = [
    { title: "Start Date", dataIndex: "date", key: "date" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage" },
  ];

  const monthlySalaryColumns = [
    { title: "Month", dataIndex: "month", key: "month" },
    { title: "Hours Worked", dataIndex: "hoursWorked", key: "hoursWorked" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage" },
    { title: "Total Salary", dataIndex: "totalSalary", key: "totalSalary" },
  ];

  // Handle the submit action
  const handleSubmit =async () => {
    const currentDate = new Date();
    
    if (startDate && startDate < currentDate) {
      message.error("Start date must be this month or in the future.");
      return;
    }

    if (isNaN(hourlyWage) || hourlyWage <= 0) {
      message.error("Hourly wage must be a positive number.");
      return;
    }
    try {
      const response = await axios.post("https://localhost:7087/api/account/create-user", {
        email: values.email,
        orderId: values.orderId,
      });

      if (response.status === 200) {
        message.success("Account created successfully!");
        onSubmit(values); 
      } else {
        message.error("Failed to create account!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      message.error("Failed to create account!");
    }
    // Add the new data to the salary history table
    const newSalaryHistory = [
      ...salaryHistoryData,
      { date: startDate.format("YYYY-MM"), hourlyWage: hourlyWage }  // Save only month and year
    ];

    setSalaryHistoryData(newSalaryHistory);
    setStartDate(null);  // Reset start date
    setHourlyWage("");   // Reset hourly wage
    message.success("Hourly wage history added successfully.");
  };

  return (
    <Modal
      title={`Staff Details - ${staff.staffId} - ${staff.name} - ${staff.email}`}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <div>
        <br></br>

        {/* Form for adding hourly wage history */}
        {
          !isFormer ? (
            <Card>
              <Form layout="horizontal" onFinish={handleSubmit} size="medium">
                <Form.Item
                  label="Start Date"
                  style={{ marginRight: 10 }}
                  rules={[{ required: true, message: "Please select start date!" }]}
                >
                  <DatePicker
                    value={startDate}
                    onChange={(date) => setStartDate(date)}
                    picker="month"
                    format="YYYY-MM"
                  />
                </Form.Item>

                <Form.Item
                  label="Hourly Wage"
                  style={{ marginRight: 10 }}
                  rules={[{ required: true, message: "Please enter hourly wage!" }]}
                >
                  <Input
                    type="number"
                    value={hourlyWage}
                    onChange={(e) => setHourlyWage(e.target.value)}
                    prefix={<svg width="0" height="0" />}
                  />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Add new Hourly Wage
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          ) : null
          }
        
      <br></br>
        {/* Hourly Wage History Table */}
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
      </div>
    </Modal>
  );
};

export default StaffDetail;
