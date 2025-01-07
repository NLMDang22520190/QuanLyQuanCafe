import { useState, useEffect, useRef } from "react";
import { Modal, Button, ConfigProvider, theme, message,Spin  } from "antd";
import { useSelector } from "react-redux";
import instance from "../../features/AxiosInstance/AxiosInstance";
import { Day, WorkWeek, Week, ScheduleComponent, Inject } from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import moment from 'moment-timezone';
import "./schedule.css";
const getCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);

    return [weekStart, weekEnd];
};
const StaffSchedule = () => {
    const scheduleRef = useRef(null);
    const [openRollCall, setOpenRollCall] = useState(false); 
    const [selectedShift, setSelectedShift] = useState(null);
    const [checkin, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);
    const [schedule, setSchedule] = useState(getCurrentWeek()); 
    const [week,setWeek]=useState([]);
    const [shiftData, setShiftData] = useState([]);
    const userId = useSelector((state) => state.auth.user);
    const [isToday,setIsToday]=useState(false);
    const [hasCheckin, setHasCheckin]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    const fetchShifts = async () => {
        console.log("user",userId)

        try {
            const response = await instance.get(`/api/shifts/staff/${userId}`);
            console.log(response.data);
            setShiftData(response.data.data);   

        } catch (error) {
            message.error("Failed to fetch shifts. Please try again.");
            console.error(error);
        }
    };


    
    const fetchSchedule = async () => {
        try {
            const formattedShifts = shiftData.flatMap((shift) => {
                const [startHour, startMinute] = shift.startTime.split(":").map(Number);
                const [endHour, endMinute] = shift.endTime.split(":").map(Number);
    
                const startOfWeek = moment(week[0]).startOf('week'); 
                const endOfWeek = startOfWeek.clone().add(5, 'days'); 
    
                const shiftsForWeek = [];
    
                // Duyệt qua các ngày trong tuần
                for (let i = 0; i < 7; i++) {
                    const currentDay = startOfWeek.clone().add(i, 'days'); // Lấy ngày hiện tại trong tuần
    
                    const isShiftInWeek =
                        moment(currentDay).isBetween(shift.startDate, shift.endDate, 'day', '[]') ||
                        moment(currentDay).isSame(shift.startDate, 'day') ||
                        moment(currentDay).isSame(shift.endDate, 'day');
                    if (isShiftInWeek && currentDay.day() !== 0) {
                        shiftsForWeek.push({
                            Id: shift.shiftId,
                            Subject: shift.shiftName,
                            StartTime: new Date(
                                currentDay.year(),
                                currentDay.month(),
                                currentDay.date(),
                                startHour,
                                startMinute
                            ),
                            EndTime: new Date(
                                currentDay.year(),
                                currentDay.month(),
                                currentDay.date(),
                                endHour,
                                endMinute
                            ),
                            Date: currentDay.format("YYYY-MM-DD"), 
                            Staff: shift.staffIds || [],
                        });
                    }
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
    }, [shiftData,week]);

    useEffect(()=>{
        fetchShifts();
    },[])

    const handleOpenRollCall = async (shift) => {
        console.log(shift);
        setSelectedShift(shift);
        setCheckInTime(null);
        setCheckOutTime(null);
        setOpenRollCall(true);
    
        try {
            console.log(userId, shift.shiftId,moment().format("YYYY-MM-DD") )
            const response = await instance.get(`/api/attendances/current-attendance`, {
                params: {
                    userId: userId, 
                    shiftId: shift.Id,
                    date: moment(shift.StartTime).format("YYYY-MM-DD"), 
                },
            });
            setIsLoading(false);
            console.log("a",response.data)
            if (response.data) {
                const attendance = response.data;
                if(attendance.checkin)
                    setCheckInTime(new Date(attendance.checkin)); 
                else 
                    setCheckInTime(null);
                if(attendance.checkout)
                    setCheckOutTime(new Date(attendance.checkout)); 
                else 
                    setCheckOutTime(null);
            } else {
                setCheckInTime(null);
                setCheckOutTime(null);
            }
        } catch (error) {
            setIsLoading(false);
            console.error("Error fetching attendance data:", error);
            message.error("Error fetching attendance. Please try again.");
        }
    };
    

    const handleCloseRollCall = () => {
        setCheckInTime(null);
        setCheckOutTime(null);
        setOpenRollCall(false);
        setSelectedShift(null);
        setIsLoading(true);
    };

    const handleCheckIn = async () => {
        if (!checkin) {
            try {          
                const checkInTimeLocal = new Date();
                const checkInTime = moment(checkInTimeLocal)
                    .utcOffset("+07:00", true) 
                    .format("YYYY-MM-DDTHH:mm:ss"); 
        
                const payload = {
                    userId,
                    shiftId: selectedShift.Id,
                    checkin: checkInTime,
                };
    
                console.log("Check-In Payload:", payload);
                console.log("Shift Start Time:", selectedShift.StartTime);
                console.log("Shift End Time:", selectedShift.EndTime);
    
                const response = await instance.post(`/api/attendances/checkin`, payload);
    
                if (response.status === 200 || response.status === 201) {
                    console.log("Check-In Successful:", response.data);
                    setCheckInTime(new Date());
                    message.success("Checked in successfully!");
                }
            } catch (error) {
                console.error("Error during Check-In:", error.response?.data || error.message);
                message.error(error.response?.data?.message || "Failed to check in. Please try again.");
            }
        }
    };
    
    

    const handleCheckOut = async () => {
        if (checkin && !checkOutTime) {
            try {
                const checkInTime = moment(checkin)
                    .utcOffset("+07:00", true)
                    .format("YYYY-MM-DDTHH:mm:ss");
    
         
                const checkOutTimeLocal = new Date();
                const checkOutTime = moment(checkOutTimeLocal)
                    .utcOffset("+07:00", true)
                    .format("YYYY-MM-DDTHH:mm:ss");
    
              
                const queryString = new URLSearchParams({
                    UserId: userId, 
                    ShiftId: selectedShift.Id, 
                    Checkin: checkInTime,
                    Checkout: checkOutTime, 
                }).toString();
    
                console.log("Check-Out Query String:", queryString);
                console.log("Shift Start Time:", selectedShift?.StartTime);
                console.log("Shift End Time:", selectedShift?.EndTime);
    
          
                const response = await instance.put(`/api/attendances/checkout?${queryString}`);
    
                if (response.status === 200 || response.status === 201) {
                    console.log("Check-Out Successful:", response.data);
                    setCheckOutTime(new Date()); // Cập nhật thời gian Check-Out vào state
                    message.success("Checked out successfully!");
                }
            } catch (error) {
                console.error("Error during Check-Out:", error.response?.data || error.message);
                message.error(error.response?.data?.message || "Failed to check out. Please try again.");
            }
        } else {
            message.warning("You need to check in first before checking out!");
        }
    };
    
    
    

    const quickInfoEventTemplate = (props) => {
        const today = new Date(); 
        setIsToday(props.StartTime?.toDateString() === today.toDateString());
    
        return (
            <div className="custom-quick-info">
                {!props.Subject && (
                    <h1 className="text-2xl text-black-80">No schedule available</h1>
                )}
                {props.Subject && (
                    <div className="mt-4 flex flex-col items-start">
                        <button
                            className={"px-4 py-2 text-sm rounded bg-[#ffc107] text-black hover:bg-[#ffb300]" }
                            onClick={() =>  handleOpenRollCall(props)}
                        >
                            Roll Call
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
                            const currentDate = args.currentDate; 
                            const dayOfWeek = currentDate.getDay(); 
                            
                            const selectedWeekStart = new Date(currentDate);
                            selectedWeekStart.setDate(currentDate.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
                        
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
                                {isLoading ? (
                                    <div className="text-center">
                                        <Spin tip="Loading..." size="large" />
                                    </div>
                                ) : (
                                    <>
                                        <Button
                                            type="primary"
                                            onClick={handleCheckIn}
                                            disabled={!isToday || !!checkin} // Disabled if not today or already checked in
                                            className="mr-2"
                                        >
                                            {checkin ? `Checked In: ${checkin.toLocaleTimeString()}` : "Check In"}
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={handleCheckOut}
                                            disabled={!checkin || !!checkOutTime} // Disabled if not checked in or already checked out
                                        >
                                            {checkOutTime
                                                ? `Checked Out: ${checkOutTime.toLocaleTimeString()}`
                                                : "Check Out"}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </ConfigProvider>
    );
};

export default StaffSchedule;



