import { useState, useRef } from "react";
import { Modal, Button, Table, ConfigProvider, theme } from "antd";
import { Day, WorkWeek, Week, ScheduleComponent, Inject } from "@syncfusion/ej2-react-schedule";
import "./schedule.css";

const StaffSchedule = () => {
    const scheduleRef = useRef(null);
    const [openRollCall, setOpenRollCall] = useState(false); // Modal Roll Call
    const [selectedShift, setSelectedShift] = useState(null);
    const [checkInTime, setCheckInTime] = useState(null);
    const [checkOutTime, setCheckOutTime] = useState(null);

    const schedule = [
        {
            Id: 1,
            Subject: "Morning Shift",
            StartTime: new Date(2024, 11, 26, 8, 0),
            EndTime: new Date(2024, 11, 26, 12, 0),
            Date: "2024-11-26",
        },
        {
            Id: 2,
            Subject: "Afternoon Shift",
            StartTime: new Date(2024, 11, 26, 13, 0),
            EndTime: new Date(2024, 11, 26, 17, 0),
            Date: "2024-11-26",
        },
    ];

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

    const handleCheckIn = () => {
        if (!checkInTime) {
            setCheckInTime(new Date());
        }
    };

    const handleCheckOut = () => {
        if (checkInTime && !checkOutTime) {
            setCheckOutTime(new Date());
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
                        selectedDate={new Date(2024, 11, 26)}
                        eventSettings={eventSettings}
                        quickInfoTemplates={{
                            content: quickInfoEventTemplate,
                        }}
                        startHour="06:00"
                        endHour="22:00"
                        showTimeIndicator={true}

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
