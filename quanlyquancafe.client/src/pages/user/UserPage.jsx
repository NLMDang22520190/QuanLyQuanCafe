import { useState,useEffect  } from "react";
import { Table, Select, message, Button, ConfigProvider, theme, Modal, Input ,InputNumber,Popconfirm } from "antd";
import "./user.css";
import instance from "../../features/AxiosInstance/AxiosInstance"; 
import StaffDetail from "./StaffDetail";
import OrderHistory from "./OrderHistory";
import AddNewUser from "./AddNewUser";
import { useSelector } from "react-redux";

const UserPage = () => {
  const userRole = useSelector((state) => state.auth.user.role);
  const [currentTab, setCurrentTab] = useState(0);
  const [usersData, setUsersData] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isFormer,setIsFormer]=useState(false)
  const [staffData, setStaffData] = useState([]);
  const [formerStaff, setFormerStaff] = useState([]);
  const [totalUser,setTotalUser]=useState(0);
  const [totalStaff,setTotalStaff]=useState(0);
  const [totalFStaff,setTotalFStaff]=useState(0);
  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newSalary, setNewSalary] = useState("");
  const [previousRole, setPreviousRole] = useState(""); 

  var categories;

  if (userRole === "Admin") {
    categories = [
      { name: "Users" },
      { name: "Staff" },
      { name: "Add New User" },
    ];
  } else {
    categories = [
      { name: "Staff" },
      { name: "Add New User" },
    ];
  }

  const [pageIndexUser,setPageIndexUser]=useState(1);
  const [pageIndexStaff,setPageIndexStaff]=useState(1);
  const [pageIndexFStaff,setPageIndexFStaff]=useState(1);
  useEffect(() => {
    fetchFStaffData();
  }, [pageIndexFStaff])
  useEffect(() => {   
    fetchUsersData();
  }, [pageIndexUser])
  useEffect(() => {
    fetchStaffData();
  }, [pageIndexStaff])
  const fetchFStaffData = async () => {
    try {
      const response = await instance.get(`/api/staff/former-staffs?pageIndex=${pageIndexFStaff}&pageSize=${10}`);


      console.log(response.data)
      setTotalFStaff(response.data.totalPages)
      setFormerStaff(response.data.data);
    } catch (error) {
      console.error("Error fetching STAFF data:", error);
    }
  };
  const fetchStaffData = async () => {
    try {
      const response = await instance.get(`/api/staff/current-staffs?pageIndex=${pageIndexStaff}&pageSize=${10}`);

      console.log(response.data.data)
      setTotalStaff(response.data.totalPages)
      setStaffData(response.data.data);
    } catch (error) {
      console.error("Error fetching STAFF data:", error);
    }
  };
  const fetchUsersData = async () => {
    try {
      const response = await instance.get(`/api/account/users?pageIndex=${pageIndexUser}&pageSize=${10}`);

      console.log(response.data)
      setTotalUser(response.data.totalPages)
      setUsersData(response.data.data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  // Cột bảng Users
  const userColumns = [
    { title: "Name", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text, record) =>
        text === "Customer" ? (
          <Select
            value={text}
            onChange={(value) => handleRoleChange(value, record.id)}
            style={{ width: 120 }}
          >
            <Select.Option value="Customer">Customer</Select.Option>
            <Select.Option value="Staff">Staff</Select.Option>
          </Select>
        ) : (
          <Button style={{ width: 120,textAlign: "left" }}>{text}</Button>
        ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (text, record) => {
        if (record.role === "Admin") {
          return null; 
        }
        return (
          <Select
            value={text ? "Active" : "Disabled"}
            onChange={(value) => handleStatusChange(value === "Active", record.id)} 
            style={{ width: 120 }}
          >
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Disabled">Disabled</Select.Option>
          </Select>
        );
      },
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
  
  const staffColumns = [
    { title: "ID", dataIndex: "staffId", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Start Date",
      dataIndex: "dateStartedWorking",
      key: "startDate",
      render: (startDate) => {
        const date = new Date(startDate);  
        if (isNaN(date.getTime())) {  
          console.error("Invalid date format: ", startDate);  
          return "Invalid Date";  
        }
        return date.toLocaleDateString('en-GB');  
      }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            ghost
            onClick={() => handleViewDetail(record.staffId)}
          >
            View Detail
          </Button>
          <Popconfirm
            title="Are you sure to remove the staff role?"
            description="This action cannot be undo."
            onConfirm={() => handleDisableStaff(record.userId)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger style={{ marginLeft: 8 }}>
              Remove Staff Role
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const formerStaffColumn = [
    { title: "ID", dataIndex: "staffId", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Start Date",
      dataIndex: "dateStartedWorking",
      key: "startDate",
      render: (startDate) => {
        const date = new Date(startDate);  
        if (isNaN(date.getTime())) {  
          console.error("Invalid date format: ", startDate);  
          return "Invalid Date";  
        }
        return date.toLocaleDateString('en-GB');  
      }
    },
    {
      title: "End Date",
      dataIndex: "dateEndWorking",
      key: "endtDate",
      render: (endtDate) => {
        const date = new Date(endtDate);  
        if (isNaN(date.getTime())) {  
          console.error("Invalid date format: ", endtDate);  
          return "Invalid Date";  
        }
        return date.toLocaleDateString('en-GB');  
      }
    }
    ,
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            ghost
            onClick={() => handleViewDetail1(record.staffId)}
          >
            View Detail
          </Button>
        </>
      ),
    },
  ];
  const handleTabChange = (index) => {
    setCurrentTab(index);
  };


  const handleRoleChange = async (value, id) => {
    if (value === "Staff") {
      const currentUser = usersData.find((user) => user.id === id);
      setPreviousRole(currentUser.role);
  
      setSelectedUserId(id);
      setIsModalVisible(true);
    } else {

      try {
        await instance.put(`/api/account/role`, {
          userId: id,
          role: "Customer",
        });
        const updatedData = usersData.map((user) =>
          user.id === id ? { ...user, role: value } : user
        );
        setUsersData(updatedData);
      } catch (error) {
        console.error("Error updating role:", error);
      }
    }
  };
  
  const handleStatusChange = async (isActive, id) => {
    try {
      if (isActive) {
        await instance.patch(`/api/account/active/${id}`);
        message.success("User activated successfully!");
      } else {
        await instance.patch(`/api/account/disable/${id}`);
        message.success("User disable successfully!");
      }
  
      const updatedData = usersData.map((user) =>
        user.id === id ? { ...user, isActive } : user
      );
      setUsersData(updatedData);
    } catch (error) {
      console.error("Error updating user status:", error);
      message.error("Failed to update user status. Please try again.");
    }
  };
  
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);

  const handleViewOrderList = (id) => {
    setSelectedUserId(id); 
    setIsOrderModalVisible(true); 
  };
  const handleCloseOrderModal = () => {
    setIsOrderModalVisible(false); 
    setSelectedUserId(null); 
  };

  const handleViewDetail = (id) => {
    const staff = staffData.find((staff) => staff.staffId === id);
    setSelectedStaff(staff);
    setIsFormer(false);
    setIsDetailModalVisible(true);
  };

  const handleViewDetail1 = (staffId) => {
    const staff = formerStaff.find((staff) => staff.staffId === staffId);
    setSelectedStaff(staff);
    setIsFormer(true);
    setIsDetailModalVisible(true);
  };

  const handleCancelDetailModal = () => {
    setIsDetailModalVisible(false);
  };

  const handleDisableStaff = async (userId) => {
    try {
      const response = await instance.post(`/api/staff/disable?userId=${userId}`);
  
      if (response.status !== 200) {
        throw new Error("Failed to disable staff");
      }
      else 
      {
        message.success("Disable staff success")
        setStaffData((prevStaffData) =>
          prevStaffData.filter((staff) => staff.userId !== userId)
        );
  
        fetchFStaffData();
        fetchUsersData();
      }
    } catch (error) {
      console.error("Error disabling staff:", error);
    }
  };


  const [loadingRole,setLoadingRole]=useState(false);
  const handleOk = async () => {
    if (!newSalary || newSalary <= 0) {
      message.error("Please enter the salary!");
      return;
    }
  
    setLoadingRole(true); 
    try {
      console.log("selectedUserId:", selectedUserId);
      console.log("hourWage:", newSalary);
  
      const response = await instance.post(
        `/api/staff/create?userId=${selectedUserId}&hourWage=${newSalary}`
      );
  
      console.log("API Response:", response.data);
      const updatedData = usersData.map((user) =>
        user.id === selectedUserId
          ? { ...user, role: "Staff", hourlyWage: newSalary }
          : user
      );
      setUsersData(updatedData);
  
      setIsModalVisible(false);
      setNewSalary("");
      message.success("Staff created successfully!");
      fetchStaffData();
    } catch (error) {
      console.error("Error creating staff:", error);
      message.error("Failed to create staff. Please try again.");
    } finally {
      setLoadingRole(false); 
    }
  };
  
  
  const handleCancel = () => {
    const updatedData = usersData.map((user) =>
      user.id === selectedUserId
        ? { ...user, role: previousRole } 
        : user
    );
    setUsersData(updatedData);

    setIsModalVisible(false);
    setNewSalary(""); 
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
                    onClick={() => handleTabChange(index + (userRole === "Admin" ? 0 : 1))}
                    className={`inline-block p-4 border-b-2 rounded-t-lg ${
                      currentTab === index + (userRole === "Admin" ? 0 : 1) ? "border-amber-500 text-amber-500" : ""
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
            pagination={{
              current: pageIndexUser,
              pageSize: 10,
              total: totalUser, 
              onChange: (page) => setPageIndexUser(page),
            }}
          />
        )}
        {currentTab===1 && (
          <>
          <Table
          title={() => <span className="custom-table-title">Current Staffs</span>}
            columns={staffColumns}
            dataSource={staffData}
            rowKey="id"
            pagination={{
              current: pageIndexStaff,
              pageSize: 10,
              total: totalStaff, 
              onChange: (page) => setPageIndexStaff(page),
            }}
          />

          <Table
          title={() => <span className="custom-table-title">Former Staffs</span>}
            columns={formerStaffColumn}
            dataSource={formerStaff}
            rowKey="id"
            pagination={{
              current: pageIndexFStaff,
              pageSize: 10,
              total: totalFStaff, 
              onChange: (page) => setPageIndexFStaff(page),
            }}
          
          />
          </>

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
          confirmLoading={loadingRole}
        >
          <InputNumber
            placeholder="Enter Wage Hour"
            value={newSalary}
            onChange={(value) => setNewSalary(value)}
            style={{width:"100%"}}
            prefix={<svg width={"0px"} height={"0px"}></svg>}
          />
        </Modal>
        <StaffDetail
            staff={selectedStaff}
            visible={isDetailModalVisible}
            onCancel={handleCancelDetailModal}
            props={selectedStaff}
            isFormer={isFormer}
        />
        <OrderHistory
          visible={isOrderModalVisible}
          onCancel={handleCloseOrderModal}
          userId={selectedUserId} 
        />r
      </div>
    </ConfigProvider>
  );
};

export default UserPage;