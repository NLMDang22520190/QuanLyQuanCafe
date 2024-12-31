using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class MonthSalaryDto
    {
        public int MSalaryId { get; set; }


        public string Month { get; set; } = string.Empty;

        public int TotalHours { get; set; }
        public int HourWage { get; set; }
    }
}
