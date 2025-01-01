import { useState, useEffect, useRef } from "react";
import { Modal, Button, ConfigProvider, theme, message } from "antd";
import { useSelector } from "react-redux";
import instance from "../../features/AxiosInstance/AxiosInstance";
import { Day, WorkWeek, Week, ScheduleComponent, Inject } from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import moment from 'moment';
import "./schedule.css";

const StaffSchedule = () => {
    const scheduleRef = useRef(null);
    const [openRollCall, setOpenRollCall] = useState(false); 
    const [selectedShift, setSelectedShift] = useState(null);
    const [checkin, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [schedule, setSchedule] = useState([]); 
    const [week,setWeek]=useState([]);
    const [shiftData, setShiftData] = useState([]);
    const [totalMShift, setTotalMShift]=useState(1);
    const [pageIndexMShift,setPageIndexMShift]=useState(1);
    const userId = useSelector((state) => state.auth.user);

    const fetchShifts = async (pageIndexMShift, pageSize) => {
        try {
            const response = await instance.get(`/api/shifts?pageIndex=${pageIndexMShift}&pageSize=${pageSize}`);
            console.log(response.data);
            setShiftData(response.data.data);   
            setTotalMShift(response.data.totalRecords);   

        } catch (error) {
            message.error("Failed to fetch shifts. Please try again.");
            console.error(err);
        }
    };


    const fetchSchedule = async () => {
        try {
          

            const formattedShifts = shiftData.flatMap((shift) => {
                const [startHour, startMinute] = shift.startTime.split(":").map(Number);
                const [endHour, endMinute] = shift.endTime.split(":").map(Number);
            
                const startOfWeek = new Date(week[0]); 
                const daysInWeek = 6;
            
                const shiftsForWeek = [];
            
                for (let i = 0; i < daysInWeek; i++) {
                    const currentDay = new Date(startOfWeek);
                    currentDay.setDate(startOfWeek.getDate() + i); 
            
                    shiftsForWeek.push({
                        Id: shift.shiftId,
                        Subject: shift.shiftName,
                        StartTime: new Date(
                            currentDay.getFullYear(),
                            currentDay.getMonth(),
                            currentDay.getDate(),
                            startHour,
                            startMinute
                        ),
                        EndTime: new Date(
                            currentDay.getFullYear(),
                            currentDay.getMonth(),
                            currentDay.getDate(),
                            endHour,
                            endMinute
                        ),
                        Date: currentDay.toISOString().split("T")[0],
                        Staff: shift.staffIds || [],
                    });
                }
            
                return shiftsForWeek;
            });
            setSchedule(formattedShifts); 
            console.log("Formatted Schedule:", formattedShifts);
        } catch (error) {
            console.error("Error fetching schedule data:", error);
        }
    };

    if(!schedule){
        fetchSchedule();
    }
    useEffect(() => {
        fetchSchedule(); 
    }, [shiftData]);

    useEffect(()=>{
        fetchShifts(pageIndexMShift,5);
    },[pageIndexMShift])

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
        if (!checkin) {
            try {
                const payload = {
                    userId,
                    shiftId: selectedShift.Id, 
                    checkin: new Date().toISOString(), 
                };
                const response = await instance.post(`/api/attendances/checkin`, payload);
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
        if (checkin && !checkOutTime) {
            try {
                const payload = {
                    UserId: userId, 
                    ShiftId: selectedShift.Id, 
                    Checkin: checkin.toISOString().split("T")[0], 
                    Checkout: new Date().toISOString().split("T")[0], 
                };
    
                const queryString = new URLSearchParams(payload).toString();
                const response = await instance.put(`/api/attendances/checkout?${queryString}`);
    
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
                        navigating={(args) => {
                            const selectedWeekStart = args.currentDate; 
                            const selectedWeekEnd = new Date(selectedWeekStart);
                            selectedWeekEnd.setDate(selectedWeekStart.getDate() + 6); 
                            setWeek([selectedWeekStart, selectedWeekEnd]);
                            fetchSchedule();
                        }}
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
                                    disabled={!!checkin}
                                    className="mr-2"
                                >
                                    {checkin ? `Checked In: ${checkin.toLocaleTimeString()}` : "Check In"}
                                </Button>
                                <Button
                                    type="primary"
                                    onClick={handleCheckOut}
                                    disabled={!checkin || !!checkOutTime}
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



