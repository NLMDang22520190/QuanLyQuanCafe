import { useState } from "react";
import { Table, Select, Button, ConfigProvider, theme, Modal, Input } from "antd";
import "./user.css";
import StaffDetail from "./StaffDetail";
import OrderHistory from "./OrderHistory";
import AddNewUser from "./AddNewUser";
const UserPage = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const [usersData, setUsersData] = useState([
    {
      id: "U001",
      name: "John Doe",
      email: "john@example.com",
      role: "Customer",
      status: "Active",
      action: "Edit",
    },
    {
      id: "U002",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Customer",
      status: "Active",
      action: "Edit",
    },
  ]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [staffData, setStaffData] = useState([
    {
      id: "S001",
      name: "Tom Brown",
      email: "tom@example.com",
      hourlyWage: "$15",
      status: "Active",
      hourlyWageHistory: [
        { date: "2024-01", hourlyWage: "$14" },
        { date: "2024-02", hourlyWage: "$15" },
        { date: "2024-02", hourlyWage: "$16" },
        { date: "2024-02", hourlyWage: "$17" },
        { date: "2024-02", hourlyWage: "$18" },
      ],
      monthlyWage: [
        { month: "January", hoursWorked: 160, hourlyWage: "$14", totalSalary: "$2240" },
        { month: "February", hoursWorked: 160, hourlyWage: "$15", totalSalary: "$2400" },
        { month: "February", hoursWorked: 160, hourlyWage: "$16", totalSalary: "$2400" },
        { month: "February", hoursWorked: 160, hourlyWage: "$17", totalSalary: "$2400" },
        { month: "February", hoursWorked: 160, hourlyWage: "$18", totalSalary: "$2400" },
      ],
    },
    {
      id: "S002",
      name: "Lucy Green",
      email: "lucy@example.com",
      hourlyWage: "$20",
      status: "Active",
      hourlyWageHistory: [
        { date: "2024-01", hourlyWage: "$18" },
        { date: "2024-02", hourlyWage: "$20" },
      ],
      monthlyWage: [
        { month: "January", hoursWorked: 160, hourlyWage: "$18", totalSalary: "$2880" },
        { month: "February", hoursWorked: 160, hourlyWage: "$20", totalSalary: "$3200" },
      ],
    },
  ]);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newSalary, setNewSalary] = useState("");
  const [previousRole, setPreviousRole] = useState(""); 

  const categories = [
    { name: "Users" },
    { name: "Staff" },
    { name: "Add New User" }
  ];

  // Cột bảng Users
  const userColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleRoleChange(value, record.id)}
          style={{ width: 120 }}
        >
          <Select.Option value="Customer">Customer</Select.Option>
          <Select.Option value="Staff">Staff</Select.Option>
        </Select>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={text}
          onChange={(value) => handleStatusChange(value, record.id)}
          style={{ width: 120 }}
        >
          <Select.Option value="Active">Active</Select.Option>
          <Select.Option value="Disabled">Disabled</Select.Option>
        </Select>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button type="primary" ghost onClick={() => handleViewOrderList(record.id)}>
          View Orders
        </Button>
      ),
    },
  ];

  // Cột bảng Staff
  const staffColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Hourly Wage", dataIndex: "hourlyWage", key: "hourlyWage" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button type="primary" ghost onClick={() => handleViewDetail(record.id)}>
            View Detail
          </Button>
          <Button
            danger
            onClick={() => handleDisableStaff(record.id)}
            style={{ marginLeft: 8 }}
          >
            Remove Staff Role
          </Button>
        </>
      ),
    },
  ];

  const handleTabChange = (index) => {
    setCurrentTab(index);
  };

  const handleRoleChange = (value, id) => {
    if (value === "Staff") {
      // Lưu lại giá trị role hiện tại để phục hồi nếu cancel
      const currentUser = usersData.find((user) => user.id === id);
      setPreviousRole(currentUser.role);

      // Chỉ hiển thị modal khi chuyển sang Staff
      setSelectedUserId(id);
      setIsModalVisible(true);
    } else {
      // Nếu không phải 'Staff', role sẽ được thay đổi ngay
      const updatedData = usersData.map((user) =>
        user.id === id ? { ...user, role: value } : user
      );
      setUsersData(updatedData);
    }
  };

  const handleStatusChange = (value, id) => {
    const updatedData = usersData.map((user) =>
      user.id === id ? { ...user, status: value } : user
    );
    setUsersData(updatedData);
  };
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);

  const handleViewOrderList = (id) => {
    setSelectedUserId(id); // Lưu lại ID của user
    setIsOrderModalVisible(true); // Hiển thị modal
  };
  const handleCloseOrderModal = () => {
    setIsOrderModalVisible(false); // Ẩn modal
    setSelectedUserId(null); // Reset user ID
  };

  const handleViewDetail = (id) => {
    const staff = staffData.find((staff) => staff.id === id);
    setSelectedStaff(staff);
    setIsDetailModalVisible(true);
  };

  const handleCancelDetailModal = () => {
    setIsDetailModalVisible(false);
  };

  const handleDisableStaff = (id) => {
    // Chuyển role của staff thành Customer khi disable
    const updatedData = staffData.map((staff) =>
      staff.id === id ? { ...staff, status: "Disabled" } : staff
    );

    // Cập nhật lại dữ liệu Staff và User
    const updatedUsersData = usersData.map((user) =>
      user.id === id ? { ...user, role: "Customer" } : user
    );

    setStaffData(updatedData);
    setUsersData(updatedUsersData);
  };

  const handleOk = () => {
    if (!newSalary) {
      // Hiển thị thông báo nếu không nhập lương cơ bản
      alert("Please enter the salary!");
      return;
    }

    // Cập nhật role thành "Staff" và lưu lương cơ bản
    const updatedData = usersData.map((user) =>
      user.id === selectedUserId
        ? { ...user, role: "Staff", hourlyWage: newSalary }
        : user
    );
    setUsersData(updatedData);

    // Đóng modal
    setIsModalVisible(false);
    setNewSalary(""); // Reset trường lương cơ bản
  };

  const handleCancel = () => {
    // Phục hồi lại giá trị role cũ
    const updatedData = usersData.map((user) =>
      user.id === selectedUserId
        ? { ...user, role: previousRole } // Gán lại role cũ
        : user
    );
    setUsersData(updatedData);

    // Đóng modal và reset thông tin lương
    setIsModalVisible(false);
    setNewSalary(""); // Reset trường lương cơ bản
  };
  const handleAddNewUser = (values) => {
    const newUser = {
      id: `U${usersData.length + 1}`.padStart(3, "0"), 
      name: values.name,
      email: values.email,
      role: "Customer",
      status: "Active",
      action: "Edit",
    };
  
    setUsersData([...usersData, newUser]);
  
    
    setCurrentTab(0);
  };
  
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ffc107",
          colorPrimaryText: "#ffffff",
          colorPrimaryHover: "#0000000",
          borderRadius: 8,
        },
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div className="flex flex-col gap-y-4 overflow-hidden h-full">
        {/* Header Section */}
        <div className="flex items-center flex gap-x-10">
          <h2 className="text-amber-500 font-medium text-3xl">User Management</h2>

          {/* Tab Navigation */}
          <div className="border-black-200 rounded-lg bg-black-600/30 flex gap-x-4">
            <ul
              className="flex gap-x-6 -mb-px text-sm text-center max-w-full overflow-x-auto"
              role="tablist"
            >
              {categories.map((tab, index) => (
                <li key={tab.name} role="presentation">
                  <button
                    onClick={() => handleTabChange(index)}
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                      currentTab === index ? "border-amber-500 text-amber-500" : ""
                    }`}
                  >
                    {tab.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Table Content */}
        {currentTab === 0 && (
          <Table
            columns={userColumns}
            dataSource={usersData}
            rowKey="id"
            pagination={1}
          />
        )}
        {currentTab===1 && (
          <Table
            columns={staffColumns}
            dataSource={staffData}
            rowKey="id"
            pagination={1}
          />
        )}

        {currentTab === 2 && (
          <div className="card-container">
            <AddNewUser
              onSubmit={(values) => {
                handleAddNewUser(values);
              }}
            />
          </div>
        )}

        {/* Modal to submit salary when changing to 'Staff' */}
        <Modal
          title="Enter Wage Hour"
          open={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Input
            placeholder="Enter Wage Hour"
            value={newSalary}
            onChange={(e) => setNewSalary(e.target.value)}
          />
        </Modal>
        <StaffDetail
            staff={selectedStaff}
            visible={isDetailModalVisible}
            onCancel={handleCancelDetailModal}
        />
        <OrderHistory
          visible={isOrderModalVisible}
          onCancel={handleCloseOrderModal}
          userId={selectedUserId} 
        />
      </div>
    </ConfigProvider>
  );
};

export default UserPage;
