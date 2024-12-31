import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton";
import { useState,useEffect, useRef } from "react";
import { Day, WorkWeek, Week, ScheduleComponent, Inject } from '@syncfusion/ej2-react-schedule';
import instance from "../../features/AxiosInstance/AxiosInstance";
import {Input,TimePicker, DatePicker,Form, message,ConfigProvider,Modal, Table, Button, Select,theme,Card } from 'antd';
import axios from "axios";
import moment from 'moment';

import "./schedule.css";

const Schedule = () => {
    const navigate = useNavigate();
    const scheduleRef = useRef(null);
    const [formCreateShift] = Form.useForm();
    const [formEditShift] = Form.useForm();
    const [assignStartDate, setAssignStartDate] = useState(null);
    const [assignEndDate, setAssignEndDate] = useState(null);
    const [role, setRole] = useState("admin");
    const [schedule1, setSchedule] = useState([]);
    const [openModal, setOpenModal] = useState(false);//assign
    const [openReport,setOpenReport]=useState(false);//see report
    const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month')); 
    const handleMonthChange = (date, dateString) => {
        setSelectedMonth(dateString);
        console.log('Selected month:', dateString); 
      };
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
    const [shiftData, setShiftData] = useState([]);

    const [openCreateModal, setOpenCreateModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false); 

    const [newShift, setNewShift] = useState({
        name: "",
        startTime: null,
        endTime: null,
    });
    const [totalMShift, setTotalMShift]=useState(1);
    const [pageIndexMShift,setPageIndexMShift]=useState(1);
    useEffect(()=>{
        fetchShift(pageIndexMShift,5);
    },[pageIndexMShift])

    const fetchShift = async(pageIndexMShift, pageSize) => {
 
        try {
            const response = await instance.get(`/api/shifts?pageIndex=${pageIndexMShift}&pageSize=${pageSize}`);
            console.log(response.data);
            setShiftData(response.data.data);   
            setTotalMShift(response.data.totalRecords);
        } catch (err) {
            message.error("Failed to fetch shifts. Please try again.");
            console.error(err);
        }
    }
    


    const fetchSchedule = async () => {
        try {
            const response = await axios.get("https://localhost:7087/api/shifts?pageIndex=1&pageSize=10");
            const shiftData = response.data.data;


            const formattedShifts = shiftData.map((shift) => {
                const [startHour, startMinute] = shift.startTime.split(":").map(Number);
                const [endHour, endMinute] = shift.endTime.split(":").map(Number);

                const today = new Date();
                return {
                    Id: shift.shiftId,
                    Subject: shift.shiftName,
                    StartTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), startHour, startMinute),
                    EndTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), endHour, endMinute),
                    Date: today.toISOString().split("T")[0], 
                    Staff: shift.staffIds || [], 
                };
            }); 
            setSchedule(formattedShifts); 
            console.log("Formatted Schedule:", formattedShifts);
        } catch (error) {
            console.error("Error fetching schedule data:", error);
        }
    };
    

    useEffect(() => {
        fetchSchedule(); 
    }, []);


    const handleEditShift = async () => {
        try {
            const startTime = formEditShift.getFieldValue("startTime");
            const endTime = formEditShift.getFieldValue("endTime");
    
            const shiftData = {
                shiftId: selectedShift.shiftId,
                shiftName: formEditShift.getFieldValue("name"),
                startTime: startTime.format("HH:mm"),
                endTime: endTime.format("HH:mm"),
            };
    
            const response = await fetch(`https://localhost:7087/api/shifts/${selectedShift.shiftId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(shiftData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error('API error details:', errorData);
                throw new Error(`Error: ${response.statusText}. ${errorData.error || 'Unknown error'}`);
            }
    
            const responseData = await response.json();
            console.log('Shift updated successfully:', responseData);
    
            setSelectedShift((prevShift) => ({
                ...prevShift,
                shiftName: responseData.shiftName,
                startTime: responseData.startTime,
                endTime: responseData.endTime,
            }));
    
            setOpenEditModal(false);
    
        } catch (error) {
            console.error('Error during shift update:', error);
            alert(error.message);
        }
    };
    

    
    const handleDeleteShift = async (shiftId) => {
        if (!window.confirm("Are you sure you want to delete this shift?")) {
            return;
        }
    
        try {
            const response = await instance.delete(`/api/shifts/${shiftId}`);
    
            if (response.status === 200) {
                message.success("Shift deleted successfully!");
                fetchShift(pageIndexMShift, 5); 
            } else {
                throw new Error(response.data.error || "Failed to delete the shift.");
            }
        } catch (error) {
            console.error("Error during shift deletion:", error);
            message.error(
                error.response?.data?.error || "An error occurred while deleting the shift."
            );
        }
    };
    
    
    
    
    
    
    const handleCreateShift = async () => {
        try {
            const values = await formCreateShift.validateFields();
            const { startTime, endTime } = values;
    
            const newShift = {
                ShiftName: values.name,
                StartTime: startTime.format("HH:mm"),
                EndTime: endTime.format("HH:mm"),
            };
            console.log(newShift);
            const response = await instance.post("/api/shifts", newShift);
            
            console.log("New Shift Data: ", response);
            if(response.status===201){
                message.success("Shift created successfully!");
                formCreateShift.resetFields();
                setOpenCreateModal(false);
                fetchShift(pageIndexMShift,5);
            }
            else message.error(response.data.title);

        } catch (error) {
            console.error("Validation or API Error:", error.response.data.title);
            message.error(`Failed to create shift. ${error.response.data.title}`);
        }
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



  

    const handleEditClick = (shift) => {

        if (!shift || !shift.shiftName || !shift.startTime || !shift.endTime) {
            console.error("Invalid shift data:", shift);
            return;
        }


        console.log("Editing shift:", shift);
            setSelectedShift(shift); 
            
        
            formEditShift.setFieldsValue({
                name: shift.shiftName,
                startTime: moment(shift.startTime, "HH:mm:ss"), 
                endTime: moment(shift.endTime, "HH:mm:ss"), 
            });
            console.log("Form values set:", formEditShift.getFieldsValue());
            setOpenEditModal(true);
    };

    const handleEmployeeSelect = (selectedRowKeys) => {
        setSelectedEmployees(selectedRowKeys);
    };

    const handleAddNewStaff = () => {
        if (!selectedNewStaff || !startDate || !endDate) {
            message.error("Please select a staff, start date, and end date.");
            return;
          }
        if (selectedNewStaff) {
            const newStaff = availableStaff.find(staff => staff.key === selectedNewStaff);
            setStaffAssignedToShift([...staffAssignedToShift, newStaff]);
            setSelectedNewStaff(null); 
        }
    };

    const handleCloseModal = () => {
        setOpenModal(false);  
    };


    const mainShiftColumns = [
        { title: "Name", dataIndex: "shiftName", key: "shiftName" },
        { title: "Start Time", dataIndex: "startTime", key: "startTime" },
        { title: "End Time", dataIndex: "endTime", key: "endTime" },
        {
            title: "",
            key: "edit",
            render: (_, record) => (
                <>
                <Button
                    type="default"
                    onClick={() => handleEditClick(record)}
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
                    onClick={() => handleDeleteShift(record.shiftId)}
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

    const eventSettings = {
        dataSource: schedule1,
    };

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
                rowKey="shiftId"
                pagination={{
                    current: pageIndexMShift,
                    pageSize: 5,
                    total: totalMShift, 
                    onChange: (page) => {
                        fetchShift(page, 5);
                        setPageIndexMShift(page);
                    },
                  }}
                  onClick={(record) => ({
                    onClick: () => handleShiftSelect(record),
                })}
            />
            <div className="flex justify-between items-center">
                <h2 className="text-amber-500 font-medium text-3xl">Schedule</h2>
              
            </div>

            <div className="max-h-[calc(100vh-200px)] min-h-[calc(100vh-200px)] overflow-auto">
            <ScheduleComponent
                    ref={scheduleRef} 
                    selectedDate={new Date()}
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
                title={<span>Assign Modal</span>}
            >
                    <div>

                    <div className="flex justify-between items-center">
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
                            <DatePicker
                                value={assignStartDate}
                                onChange={setAssignStartDate}
                                style={{ width: 200, marginLeft: 10 }}
                                placeholder="Select Start Date"
                                format="YYYY-MM-DD"
                            />
                            
                            <DatePicker
                                value={assignEndDate}
                                onChange={setAssignEndDate}
                                style={{ width: 200, marginLeft: 10 }}
                                placeholder="Select End Date"
                                format="YYYY-MM-DD"
                            />
                            <Button
                                type="primary"
                                onClick={handleAddNewStaff}
                                className="ml-2"
                            >
                                Add Staff
                            </Button>
                            </div>
                        </div>
                        <Table
                            title={() => 
                            <>
                            <span className="custom-table-title mr-8">Monthly Assignment</span>
                              <DatePicker 
                                onChange={handleMonthChange}
                                picker="month" 
                                format="YYYY-MM" 
                                value={selectedMonth ? moment(selectedMonth, 'YYYY-MM') : null}
                                placeholder="Select Month"
                            />
                            </>}
                            columns={staffColumns}
                            dataSource={staffAssignedToShift}
                            rowKey="key"
                            pagination={false}
                            style={{ marginTop: "12px" }}

                        />
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
                            {`${selectedShift?.StartTime?.toLocaleTimeString() || '00:00:00'} - ${selectedShift?.EndTime?.toLocaleTimeString() || '00:00:00'}`}

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
