using System.ComponentModel.DataAnnotations;

namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class SalaryDto
    {
        public int SalaryId { get; set; }
        public int StaffId { get; set; }
        public int HourWage { get; set; }
        public DateOnly StartDate { get; set; }
    }
}
