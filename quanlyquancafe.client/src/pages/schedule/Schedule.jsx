import { useNavigate } from "react-router-dom";
import { RoundedButton } from "../../components/buttons/RoundedButton";
import { useState,useEffect, useRef } from "react";
import { Day, WorkWeek, Week, ScheduleComponent, Inject } from '@syncfusion/ej2-react-schedule';
import instance from "../../features/AxiosInstance/AxiosInstance";
import {Input,TimePicker, DatePicker,Form, message,ConfigProvider,Modal, Table, Button, Select,theme,Card } from 'antd';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import moment from 'moment';

import "./schedule.css";

const Schedule = () => {
    dayjs.extend(isSameOrBefore);

    const navigate = useNavigate();
    const scheduleRef = useRef(null);
    const [formCreateShift] = Form.useForm();
    const [formEditShift] = Form.useForm();
    const [assignStartDate, setAssignStartDate] = useState(null);
    const [assignEndDate, setAssignEndDate] = useState(null);
    const [role, setRole] = useState("admin");
    const [openModal, setOpenModal] = useState(false);//assign
    const [openReport,setOpenReport]=useState(false);//see report


    const [selectedMonth, setSelectedMonth] = useState(moment().startOf('month')); 
    const handleMonthChange = (date, dateString) => {
        if(date){
            setSelectedMonth(moment(dateString, 'YYYY-MM').startOf('month'));
            setAssignStartDate(null)
            console.log('Selected month:', date.format('YYYY-MM')); 
        }
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

    const [openCreateModal, setOpenCreateModal] = useState(false); // Control Create Shift Modal
    const [openEditModal, setOpenEditModal] = useState(false); // Control Create Shift Modal
    const [staffsNotInShift,setStaffsNotInShift]=useState([]);
    const [selectedShiftInTable,setSelectedShiftInTable]=useState(null);
    useEffect(() => {
        console.log("Selected month changed:", selectedMonth);

        fetchStaffsNotInShift();
      }, [selectedShiftInTable, selectedMonth]);
    const fetchStaffsNotInShift = async() => {
        try {
            if(selectedShiftInTable===null)
                return;
            const response = await instance.get(`api/staff/staff-not-in-shift/${selectedShiftInTable.shiftId}?month=${selectedMonth.format('M')}&year=${selectedMonth.format('YYYY')}`);
            console.log(response.data);
            setStaffsNotInShift(response.data.map(staff => ({
                key: staff.staffId, 
                value: staff.staffId, 
                name: staff.name, 
            })));   
        } catch (err) {
            
            console.error(err);
        }
    }
          
    const [pageIndexStaffInShift,setPageIndexStaffInShift]=useState(1);
    const [totalStaffInShift, setTotalStaffInShift]=useState(1)
    const [totalMShift, setTotalMShift]=useState(1);
    const [pageIndexMShift,setPageIndexMShift]=useState(1);
    useEffect(()=>{
        fetchShift(pageIndexMShift,5);
    },[pageIndexMShift])
    useEffect(()=>{
        fetchStaffInShift(pageIndexStaffInShift,5);
    },[selectedMonth,selectedShiftInTable,pageIndexStaffInShift])
    const fetchStaffInShift = async(pageIndex, pageSize) => {
 
        try {
            if(selectedShiftInTable===null||selectedMonth==null){
                console.log("selected shift null")
                return
            }
            const response = await instance.get(`/api/staff/staff-in-shift/${selectedShiftInTable.shiftId}?month=${selectedMonth.format('M')}&year=${selectedMonth.format('YYYY')}&pageIndex=${pageIndex}&pageSize=${pageSize}`);
            console.log("fetch ok",response.data);
            setStaffAssignedToShift(response.data.data);   
            setTotalStaffInShift(response.data.totalRecords);
            

        } catch (err) {
            setStaffAssignedToShift([]);   
            setTotalStaffInShift(0);
            message.info("No staff is assigned");
            console.error(err);
        }
    }
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
        console.log("shift",shift)
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




    const handleEmployeeSelect = (selectedRowKeys) => {
        setSelectedEmployees(selectedRowKeys);
    };

    const handleAddNewStaff = async () => {
        if (!selectedNewStaff || !assignStartDate || !assignEndDate||!selectedShiftInTable) {
            message.error("Please select a staff, start date, and end date.");
            return;
          }
          const scheduleData = {
            StaffId: selectedNewStaff,
            StartDate: dayjs(assignStartDate).format('YYYY-MM-DD'),
            EndDate: dayjs(assignEndDate).format('YYYY-MM-DD'),
            ShiftId: selectedShiftInTable.shiftId, 
        };
        try {
            const response = await instance.post('/api/schedules/create-schedule', scheduleData);
            console.log(response.data)
            if (response.status === 200 || response.status === 201) {
                
                message.success('Staff assigned successfully!');
                fetchStaffInShift(pageIndexStaffInShift, 5);
                fetchStaffsNotInShift();
                setSelectedNewStaff(null);
                setAssignStartDate(null);
                setAssignEndDate(null)
            } else {
                message.error('Failed to assign staff. Please try again.');
            }
        } catch (error) {
            console.error('Error adding staff:', error);
            message.error('An error occurred while assigning staff.');
        }
    
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
                    onClick={() => setOpenEditModal(true)}
                >
                    Edit
                </Button>
                <Button
                    type="default"
                    onClick={() => {
                        setSelectedShiftInTable(record);
                        setOpenModal(true);
                        }
                    }
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

    const data = [
        { key: 1, name: 'John Doe', EndDate: '2024-12-31' },
        { key: 2, name: 'Jane Smith', EndDate: '2025-01-15' },
    ];

    const [editingKey, setEditingKey] = useState(null); 
    const [selectedDateUpdate, setSelectedDateUpdate] = useState(null);
    const staffColumns =  [
        { title: 'Staff Name', dataIndex: 'name', key: 'name' },
        { title: 'StartDate', dataIndex: 'startDate', key: 'startDate' },

        { title: 'EndDate', dataIndex: 'endDate', key: 'endDate' },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => {
                if (editingKey === record.staffId) {
                    return (
                        <div>
                            <DatePicker
                                value={selectedDateUpdate}
                                defaultValue={record.endDate ? moment(record.endDate) : null}
                                onChange={(date) => setSelectedDateUpdate(date)}
                                format="YYYY-MM-DD"
                                disabledDate={(currentDate) =>
                                    currentDate && currentDate <= moment().endOf('day')
                                }
                            />
                            <Button onClick={() => handleSaveEndDate(record.staffId)} type="default" style={{ marginLeft: 8 }}>
                                Save
                            </Button>
                            <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
                                Cancel
                            </Button>
                        </div>
                    );
                }
                return (
                    <Button onClick={() => {
                        console.log("aa",record.staffId)
                        handleUpdateEndDate(record.staffId)}}>
                        Update EndDate
                    </Button>
                );
            },
        },
    ];
    const [selectedDates, setSelectedDates] = useState({}); 
    const handleUpdateEndDate = (key) => {
        setEditingKey(key); 
        const currentRecord = staffAssignedToShift.find((record) => record.staffId === key);
        setSelectedDateUpdate(moment(currentRecord.endDate, 'YYYY-MM-DD'));
    };
    const handleSaveEndDate = async (staffId) => {
        if (selectedDateUpdate && selectedDateUpdate.isAfter(moment())) {
            try {

                console.log("staff",staffId);
                console.log("shift",selectedShiftInTable.shiftId)
                const response = await instance.put(
                    `/api/schedules/update-end-date?staffId=${staffId}&shiftId=${selectedShiftInTable.shiftId}`,
                    dayjs(selectedDateUpdate).format('YYYY-MM-DD')
                );
    
                if (response.status === 200 || response.status === 201) {
                    message.success("Update new end date success");
                    setEditingKey(null);
                    fetchStaffInShift(pageIndexStaffInShift, 5); 
                } else {
                    message.error("Failed to update end date. Please try again.");
                    console.error("Error response:", response);
                }
            } catch (error) {
          
                console.error("API call failed:", error);
                message.error("An error occurred while updating the end date.");
            }
        } else {
            message.error("Selected date must be greater than today.");
        }
    };
    
    const handleCancelEdit = () => {
        setEditingKey(null); // Thoát chế độ chỉnh sửa
        setSelectedDateUpdate(null); // Reset giá trị DatePicker
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
                                {staffsNotInShift
                                    .map(staff => (
                                        <Select.Option key={staff.key} value={staff.value}>
                                            {staff.name}
                                        </Select.Option>
                                    ))}
                            </Select>
                            <Select
                                value={assignStartDate ? assignStartDate.format('YYYY-MM-DD') : null}
                                onChange={(value) => setAssignStartDate(moment(value))}
                                style={{ width: 200, marginLeft: 10 }}
                                placeholder="Select Start Date"
                            >
                                {selectedMonth &&
                                    Array.from(
                                        { length: moment(selectedMonth, 'YYYY-MM').daysInMonth() },
                                        (_, i) => {
                                            const date = moment(selectedMonth, 'YYYY-MM')
                                                .startOf('month')
                                                .add(i, 'days');
                                            return (
                                                <Select.Option key={date.format('YYYY-MM-DD')} value={date.format('YYYY-MM-DD')}>
                                                    {date.format('YYYY-MM-DD')}
                                                </Select.Option>
                                            );
                                        }
                                    )}
                            </Select>
        
                            
                            <DatePicker
                                value={assignEndDate}
                                disabled={!assignStartDate} 
                                onChange={(value) => {
                                    if (assignStartDate && dayjs(value).isSameOrBefore(assignStartDate, 'day')) {
                                        message.error('End Date must be after Start Date');
                                    } else {
                                        setAssignEndDate(value);
                                    }
                                }}
                                style={{ width: 200, marginLeft: 10 }}
                                placeholder="Select End Date"
                                format="YYYY-MM-DD"
                                disabledDate={(currentDate) => {
                                    return assignStartDate && currentDate.isSameOrBefore(assignStartDate, 'day');
                                }}
                            />

                            <Button
                                type="primary"
                                onClick={handleAddNewStaff}
                                className="ml-2"
                                disabled={!assignEndDate}
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
                                value={selectedMonth.isValid() ? selectedMonth : null}
                                placeholder="Select Month"
                                inputReadOnly 
                            />
                            </>}
                            columns={staffColumns}
                            dataSource={staffAssignedToShift}
                            rowKey="staffId"
                            pagination={{
                                current: pageIndexStaffInShift,
                                pageSize: 5,
                                total: totalStaffInShift, 
                                onChange: (page) => {
                                    fetchStaffInShift(page, 5);
                                    setPageIndexStaffInShift(page);
                                },}
                              }
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
