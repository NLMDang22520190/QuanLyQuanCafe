namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class StaffAttendanceDto
    {
        public string StaffName { get; set; } = string.Empty;
        public DateTime? Checkin { get; set; }
        public DateTime? Checkout { get; set; }
    }

}
