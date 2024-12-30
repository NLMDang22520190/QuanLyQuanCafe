using System.ComponentModel.DataAnnotations;

namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class ShiftDTO
    {
        public int ShiftId { get; set; }
        public string ShiftName { get; set; } = null!;
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
    }
}
