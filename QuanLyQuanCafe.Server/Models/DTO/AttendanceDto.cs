using System.ComponentModel.DataAnnotations;

namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class AttendanceDto
    {
        public int AttendanceId { get; set; }
        public int ScheduleId { get; set; }
        public DateOnly Date { get; set; }

        public DateTime? Checkin { get; set; }
        public DateTime? Checkout { get; set; }
    }
}
