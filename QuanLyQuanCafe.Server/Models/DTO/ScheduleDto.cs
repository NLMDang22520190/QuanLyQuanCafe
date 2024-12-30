namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class ScheduleDto
    {
        public int ScheduleId { get; set; }
        public int StaffId { get; set; }

        public DateOnly StartDate { get; set; }

        public DateOnly EndDate { get; set; }

        public int ShiftId { get; set; }
    }
}
