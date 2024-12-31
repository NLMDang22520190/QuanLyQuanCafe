import { useState, useEffect, useRef } from "react";
import { Modal, Button, ConfigProvider, theme } from "antd";
import { Day, WorkWeek, Week, ScheduleComponent, Inject } from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import "./schedule.css";

const StaffSchedule = () => {
    const scheduleRef = useRef(null);
    const [openRollCall, setOpenRollCall] = useState(false); 
    const [selectedShift, setSelectedShift] = useState(null);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [schedule, setSchedule] = useState([]); 

 
    const fetchShifts = async () => {
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
                };
            });

            setSchedule(formattedShifts);
        } catch (error) {
            console.error("Error fetching shifts:", error);
        }
    };

    useEffect(() => {
        fetchShifts(); 
    }, []);

    const handleOpenRollCall = (shift) => {
        setSelectedShift(shift);
        setCheckInTime(null);
        setCheckOutTime(null);
        setOpenRollCall(true);
    };

    const handleCloseRollCall = () => {
        setOpenRollCall(false);
        setSelectedShift(null);
    };

    const handleCheckIn = async () => {
        if (!checkInTime) {
            try {
                const payload = {
                    shiftId: selectedShift.Id, 
                    checkInTime: new Date().toISOString(), 
                };
                const response = await axios.post("https://localhost:7087/api/attendances/checkin", payload);
                console.log("Check-In Successful:", response.data);
                setCheckInTime(new Date());
                message.success("Checked in successfully!");
            } catch (error) {
                console.error("Error during Check-In:", error.response?.data || error.message);
                message.error(error.response?.data?.message || "Failed to check in. Please try again.");
            }
        }
    };
    

    const handleCheckOut = async () => {
        if (checkInTime && !checkOutTime) {
            try {
                const userId = localStorage.getItem("userId");
                const payload = {
                    UserId: userId, 
                    ShiftId: selectedShift.Id, 
                    Checkin: checkInTime.toISOString().split("T")[0], 
                    Checkout: new Date().toISOString().split("T")[0], 
                };
    
                const queryString = new URLSearchParams(payload).toString();
                const response = await axios.post(`https://localhost:7087/api/attendances/checkout?${queryString}`);
    
                console.log("Check-Out Successful:", response.data);
                setCheckOutTime(new Date());
                message.success("Checked out successfully!");
            } catch (error) {
                console.error("Error during Check-Out:", error.response?.data || error.message);
                message.error(error.response?.data?.message || "Failed to check out. Please try again.");
            }
        }
    };
    

    const quickInfoEventTemplate = (props) => (
        <div className="custom-quick-info">
            {!props.Subject && <h1 className="text-2xl text-black-80">No schedule available</h1>}
            {props.Subject && (
                <div className="mt-4 flex flex-col items-start">
                    <button
                        className="px-4 py-2 text-sm bg-[#ffc107] text-black rounded hover:bg-[#ffb300]"
                        onClick={() => handleOpenRollCall(props)}
                    >
                        Roll Call
                    </button>
                </div>
            )}
        </div>
    );

    const eventSettings = {
        dataSource: schedule, 
    };

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: "#ffc107",
                    colorPrimaryText: "#ffffff",
                    colorPrimaryHover: "#e0a806",
                    borderRadius: 8,
                },
                algorithm: theme.darkAlgorithm,
            }}
        >
            <div className="flex flex-col gap-y-4 overflow-hidden h-full">
                <h2 className="text-amber-500 font-medium text-3xl">Staff Schedule</h2>

                <div className="max-h-[calc(100vh-200px)] min-h-[calc(100vh-200px)] overflow-auto">
                    <ScheduleComponent
                        ref={scheduleRef}
                        selectedDate={new Date()}
                        eventSettings={eventSettings}
                        quickInfoTemplates={{
                            content: quickInfoEventTemplate,
                        }}
                        startHour="06:00"
                        endHour="22:00"
                        showTimeIndicator={true}
                        readonly={true} 
                    >
                        <Inject services={[Day, Week, WorkWeek]} />
                    </ScheduleComponent>
                </div>

                {/* Modal for Roll Call */}
                <Modal
                    title="Roll Call"
                    open={openRollCall}
                    onCancel={handleCloseRollCall}
                    footer={null}
                    width={600}
                >
                    {selectedShift && (
                        <div>
                            <p>
                                <strong>Shift Name:</strong> {selectedShift.Subject}
                            </p>
                            <p>
                                <strong>Date:</strong> {selectedShift.Date}
                            </p>
                            <p>
                                <strong>Time:</strong>{" "}
                                {`${selectedShift.StartTime.toLocaleTimeString()} - ${selectedShift.EndTime.toLocaleTimeString()}`}
                            </p>

                            <div className="mt-4">
                                <Button
                                    type="primary"
                                    onClick={handleCheckIn}
                                    disabled={!!checkInTime}
                                    className="mr-2"
                                >
                                    {checkInTime ? `Checked In: ${checkInTime.toLocaleTimeString()}` : "Check In"}
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={handleCheckOut}
                                    disabled={!checkInTime || !!checkOutTime}
                                >
                                    {checkOutTime
                                        ? `Checked Out: ${checkOutTime.toLocaleTimeString()}`
                                        : "Check Out"}
                                </Button>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default StaffSchedule;



