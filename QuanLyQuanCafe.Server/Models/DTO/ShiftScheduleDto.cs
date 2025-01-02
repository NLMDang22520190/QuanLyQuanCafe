namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class ShiftScheduleDto
    {
        public int ShiftId { get; set; }
        public string ShiftName { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
        public DateOnly StartDate { get; set; } // Added StartDate
        public DateOnly EndDate { get; set; }   // Added EndDate
        public int StaffId { get; set; }

    }
}
