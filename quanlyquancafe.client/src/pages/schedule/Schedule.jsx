import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton";
import { useState, useRef } from "react";
import { Day, WorkWeek, Week, ScheduleComponent, Inject } from '@syncfusion/ej2-react-schedule';
import {Input,TimePicker,Form, message,ConfigProvider,Modal, Steps, Table, Button, Select,theme } from 'antd';
import "./schedule.css";

const Schedule = () => {
    const navigate = useNavigate();
    const scheduleRef = useRef(null);
    const [formCreateShift] = Form.useForm();
    const [formEditShift] = Form.useForm();

    const [role, setRole] = useState("admin");
    const [openModal, setOpenModal] = useState(false);//assign
    const [openReport,setOpenReport]=useState(false);//see report

    const [selectedShift, setSelectedShift] = useState(null);
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [staffAssignedToShift, setStaffAssignedToShift] = useState([]); 
    const [availableStaff, setAvailableStaff] = useState([ 
        { key: 1, name: 'Employee 1' },
        { key: 2, name: 'Employee 2' },
        { key: 3, name: 'Employee 3' },
        { key: 4, name: 'Employee 4' },
    ]);
    const [selectedNewStaff, setSelectedNewStaff] = useState(null);
    const [staffAttendance, setStaffAttendance] = useState([]); 
    const attendanceData = {
        1: [
            { key: 1, name: "Employee 1", checkIn: "09:05", checkOut: "12:00" },
            { key: 2, name: "Employee 2", checkIn: "09:00", checkOut: "11:50" },
        ],
        2: [
            { key: 3, name: "Employee 3", checkIn: "13:10", checkOut: "17:00" },
            { key: 4, name: "Employee 4", checkIn: "13:00", checkOut: "16:50" },
        ],
    };
    const [shiftData, setShiftData] = useState([
        {
            Id: 1,
            Name: "Morning Shift",
            StartTime: "08:00 AM",
            EndTime: "12:00 PM",
        },
        {
            Id: 2,
            Name: "Afternoon Shift",
            StartTime: "01:00 PM",
            EndTime: "05:00 PM",
        },
    ]);
    const [openCreateModal, setOpenCreateModal] = useState(false); // Control Create Shift Modal
    const [openEditModal, setOpenEditModal] = useState(false); // Control Create Shift Modal

    const [newShift, setNewShift] = useState({
        name: "",
        startTime: null,
        endTime: null,
    });
    const handleEditShift = () => {
        formCreateShift.validateFields()
            .then((values) => {
                const { startTime, endTime } = values;

                const newShift = {
                    name: values.name,
                    startTime: startTime.format("HH:mm"),
                    endTime: endTime.format("HH:mm"),
                };

                // Replace with API call or state update logic
                console.log("New Shift Data: ", newShift);

                message.success("Shift created successfully!");
                formCreateShift.resetFields(); 
                setOpenEditModal(false); 
            })
            .catch((error) => {
                console.error("Validation Failed:", error);
            });
    };
    const handleCreateShift = () => {
        formCreateShift.validateFields()
            .then((values) => {
                const { startTime, endTime } = values;

                const newShift = {
                    name: values.name,
                    startTime: startTime.format("HH:mm"),
                    endTime: endTime.format("HH:mm"),
                };

                // Replace with API call or state update logic
                console.log("New Shift Data: ", newShift);

                message.success("Shift created successfully!");
                formCreateShift.resetFields(); 
                setOpenCreateModal(false); 
            })
            .catch((error) => {
                console.error("Validation Failed:", error);
            });
    };
    const handleOpenReport = (shift) => {
        setSelectedShift(shift);
    
        const staffInShift = availableStaff.filter(staff =>
            shift.Staff.includes(staff.key)
        );
    
        const combinedData = staffInShift.map(staff => {
            const attendance = (attendanceData[shift.Id] || []).find(a => a.key === staff.key);
            return {
                ...staff,
                checkIn: attendance?.checkIn || "N/A",
                checkOut: attendance?.checkOut || "N/A",
            };
        });
    
        setStaffAttendance(combinedData);
        setOpenReport(true);
    };
    

    const handleCloseReport = () => {
        setOpenReport(false);
        setSelectedShift(null);
        setStaffList([]);
    };

    const handleModalOpen = () => {  
        setOpenModal(!openModal);
        setSelectedShift(null);
        setSelectedEmployees([]);
        setStaffAssignedToShift([]); // Reset staff assigned
    };



  

    const handleShiftSelect = (shift) => {
        setSelectedShift(shift);
        setStaffAssignedToShift([]);  
    };

    const handleEmployeeSelect = (selectedRowKeys) => {
        setSelectedEmployees(selectedRowKeys);
    };

    const handleAddNewStaff = () => {
        if (selectedNewStaff) {
            const newStaff = availableStaff.find(staff => staff.key === selectedNewStaff);
            setStaffAssignedToShift([...staffAssignedToShift, newStaff]);
            setSelectedNewStaff(null); 
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);  
    };

    const schedule = [
        {
            Id: 1,
            Subject: "Morning Shift",
            StartTime: new Date(2024, 11, 26, 8, 0), 
            EndTime: new Date(2024, 11, 26, 9, 0), 
            Date: "2024-11-26",
            Staff: [1, 2, 3],
        },
        {
            Id: 2,
            Subject: "Afternoon Shift",
            StartTime: new Date(2024, 11, 26, 10, 0),
            EndTime: new Date(2024, 11, 26, 11, 0),
            Date: "2024-11-26",
            Staff: [2, 3, 4],
        },
    ];


    const mainShiftColumns = [
        { title: "Name", dataIndex: "Name", key: "name" },
        { title: "Start Time", dataIndex: "StartTime", key: "startTime" },
        { title: "End Time", dataIndex: "EndTime", key: "endTime" },
        {
            title: "",
            key: "edit",
            render: (_, record) => (
                <>
                <Button
                    type="default"
                    onClick={() => setOpenEditModal(true)}
                >
                    Edit
                </Button>
                <Button
                    type="default"
                    onClick={() => handleModalOpen()}
                    className=" ml-4"
                >
                    Assign
                </Button>
                <Button
                    type="primary"
                    onClick={() => handleEditShift(record)}
                    className="bg-amber-500 hover:bg-amber-400 ml-4"
                    danger
                >
                    Remove
                </Button>
                </>
                
            ),
        },
    ];

    const shiftColumns = [
        { title: 'Shift Name', dataIndex: 'Subject', key: 'subject' },
        { title: 'Start Time', dataIndex: 'StartTime', key: 'startTime' },
        { title: 'End Time', dataIndex: 'EndTime', key: 'endTime' },
        {
            title: 'Action', key: 'action', render: (text, record) => (
                <Button onClick={() => handleShiftSelect(record)}>Select</Button>
            )
        },
    ];

    const employeeColumns = [
        { title: 'Employee Name', dataIndex: 'name', key: 'name' },
    ];

    const staffColumns = [
        { title: 'Staff Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Action', key: 'action', render: (_, record) => (
                <Button onClick={() => handleRemoveStaff(record.key)}>Remove</Button>
            )
        },
    ];

    const handleRemoveStaff = (staffKey) => {
        setStaffAssignedToShift(staffAssignedToShift.filter(staff => staff.key !== staffKey));
    };
    const quickInfoEventTemplate = (props) => (
        <div className="custom-quick-info">
            {!props.Subject && (
                <h1 className="text-2xl text-black-80">There is no schedule</h1>
            )}
            {props.Subject && (
                <>
                    <div className="mt-4 flex flex-col items-start">
                        <button
                            className="px-4 py-2 text-sm bg-[#ffc107] text-black rounded hover:bg-[#ffb300]"

                            onClick={() => handleOpenReport(props)}
                        >
                            See report
                        </button>
                    </div>
                </>
            )}
        </div>
    );
    const footerTemplate = (props) => {
        return (
            <div className="quick-info-footer">
                {props.elementType === "cell" && (
                    <div className="cell-footer">
                        <button
                            className="px-4 py-2 text-sm bg-[#ffc107] text-black rounded hover:bg-[#ffb300]"
                            onClick={() => {
                                if (scheduleRef.current) {
                                    const data = {
                                        ...props,
                                        startTime: props.startTime || new Date(),
                                        endTime: props.endTime || new Date(new Date().getTime() + 30 * 60 * 1000), 
                                    };
                                    scheduleRef.current.openEditor(data, "Add");
                                }
                            }}
                        >
                            Add new Shift
                        </button>
                    </div>
                )}
            </div>
        );
    };
    const eventSettings = {
        dataSource: schedule,
    };
    return (
        <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#ffc107", 
            colorPrimaryText: "#000000",
            colorPrimaryHover: "#e0a806", 
            borderRadius: 8, 
            
          },
          algorithm: theme.darkAlgorithm,
        }}
      >
        <div className="flex flex-col gap-y-4 overflow-hidden h-full">
        <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Shift</h2>
                {role === "admin" ? (
                    <div >
                        <RoundedButton height="40px" label="Add new Shift" onClick={() => setOpenCreateModal(true)}/>
                    </div>
                 ) : (
                    <RoundedButton height="40px" label="Roll Call" />
                )}
            </div>
            <Table
                columns={mainShiftColumns}
                dataSource={shiftData}
                rowKey="Id"
                pagination={false}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Schedule</h2>
              
            </div>

            <div className="max-h-[calc(100vh-200px)] min-h-[calc(100vh-200px)] overflow-auto">
            <ScheduleComponent
                    ref={scheduleRef} 
                    selectedDate={new Date(2024, 11, 26)}
                    eventSettings={eventSettings}
                    quickInfoTemplates={{
                        content: quickInfoEventTemplate,
                        footer: footerTemplate,
                    }}
                    startHour="06:00" 
                    endHour="22:00"   
                    showTimeIndicator={true}
                    readonly={true} 
                >
                    <Inject services={[Day, Week, WorkWeek]} />
                </ScheduleComponent>
            </div>

            {/* Modal with Assign */}
            <Modal
                open={openModal}
                onCancel={handleModalOpen}
                footer={null}
                width={800}
            >
                    <div>
                        <Table
                            title={() => <span className="custom-table-title">Assign shift</span>}
                            columns={staffColumns}
                            dataSource={staffAssignedToShift}
                            rowKey="key"
                            pagination={false}
                            style={{ marginTop: "12px" }}

                        />
                        <div className="mt-4 flex justify-between items-center">
                            <div className="mt-4 flex  items-center" >
                            <Select
                                value={selectedNewStaff}
                                onChange={setSelectedNewStaff}
                                style={{ width: 200 }}
                                placeholder="Select a new staff"
                            >
                                {availableStaff
                                    .filter(staff => !staffAssignedToShift.some(s => s.key === staff.key)) 
                                    .map(staff => (
                                        <Select.Option key={staff.key} value={staff.key}>
                                            {staff.name}
                                        </Select.Option>
                                    ))}
                            </Select>
                            <Button
                                type="primary"
                                onClick={handleAddNewStaff}
                                className="ml-2"
                            >
                                Add Staff
                            </Button>
                            </div>
                        </div>
                    </div>
            </Modal>
            {/* Modal with See report */}
            <Modal
                open={openReport}
                onCancel={handleCloseReport}
                footer={null}
                width={800}
            >
            {selectedShift && (
                    <div>
                        <p><strong>Shift Name:</strong> {selectedShift.Subject}</p>
                        <p><strong>Date:</strong> {selectedShift.Date}</p>
                        <p>
                            <strong>Time:</strong>{" "}
                            {`${selectedShift.StartTime.toLocaleTimeString()} - ${selectedShift.EndTime.toLocaleTimeString()}`}
                        </p>

                        <Table
                            columns={[
                                { title: "Staff Name", dataIndex: "name", key: "name" },
                                { title: "Check-In", dataIndex: "checkIn", key: "checkIn" },
                                { title: "Check-Out", dataIndex: "checkOut", key: "checkOut" },
                            ]}
                            dataSource={staffAttendance}
                            rowKey="key"
                            pagination={false}
                            style={{ marginTop: "12px" }}

                        />
                    </div>
                )}
            </Modal>
          {/* modal create shift */}
          <Modal
                title="Create Shift"
                open={openCreateModal}
                onCancel={() => setOpenCreateModal(false)}
                onOk={handleCreateShift}
                okText="Create"
            >
            <Form
                    layout="vertical"
                    name="create_shift"
                    initialValues={{
                        name: "",
                        timeRange: [],
                    }}
                    form={formCreateShift}
                >
                    <Form.Item
                        label="Shift Name"
                        name="name"
                        rules={[
                            { required: true, message: "Please input the shift name!" },
                        ]}
                    >
                        <Input placeholder="Enter shift name" prefix={<svg width={"0px"} height={"0px"}></svg>}/>
                    </Form.Item>

                    <Form.Item
                        label="Start Time"
                        name="startTime"
                        rules={[
                            {
                                required: true,
                                message: "Please select the start time!",
                            },
                        ]}
                    >
                        <TimePicker format="HH:mm" />
                    </Form.Item>

                    <Form.Item
                        label="End Time"
                        name="endTime"
                        rules={[
                            {
                                required: true,
                                message: "Please select the end time!",
                            },
                        ]}
                    >
                        <TimePicker format="HH:mm" />
                    </Form.Item>
                </Form>
        </Modal>
        {/* modal edit shift */}
                  <Modal
                title="Edit Shift"
                open={openEditModal}
                onCancel={() => setOpenEditModal(false)}
                onOk={handleEditShift}
                okText="Save"
            >
            <Form
                    layout="vertical"
                    name="create_shift"
                    initialValues={{
                        name: "",
                        timeRange: [],
                    }}
                    form={formEditShift}
                >
                    <Form.Item
                        label="Shift Name"
                        name="name"
                        rules={[
                            { required: true, message: "Please input the shift name!" },
                        ]}
                    >
                        <Input placeholder="Enter shift name" prefix={<svg width={"0px"} height={"0px"}></svg>}/>
                    </Form.Item>

                    <Form.Item
                        label="Start Time"
                        name="startTime"
                        rules={[
                            {
                                required: true,
                                message: "Please select the start time!",
                            },
                        ]}
                    >
                        <TimePicker format="HH:mm" />
                    </Form.Item>

                    <Form.Item
                        label="End Time"
                        name="endTime"
                        rules={[
                            {
                                required: true,
                                message: "Please select the end time!",
                            },
                        ]}
                    >
                        <TimePicker format="HH:mm" />
                    </Form.Item>
                </Form>
        </Modal>
        </div>
        </ConfigProvider>

    );
};

export default Schedule;
