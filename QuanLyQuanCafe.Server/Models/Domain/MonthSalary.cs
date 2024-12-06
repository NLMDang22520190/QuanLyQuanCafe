using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models.Domain
{
    [Table("MonthSalary")]
    public class MonthSalary
    {
        [Key]
        public int MSalaryId { get; set; } 

        [ForeignKey("Salary")]
        public int SalaryId { get; set; } 

        [Required]
        [StringLength(7)] // format "YYYY-MM"
        public string Month { get; set; } = string.Empty; 

        [Required]
        public int TotalHours { get; set; } 

        public virtual Salary Salary { get; set; } = null!;
    }
}
