using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;
[Table("Salary")]
public partial class Salary
{
    [Key]
    public int SalaryId { get; set; }
    [Required]
    public int StaffId { get; set; }
    [Required]
    public int HourWage { get; set; }
    [Required]
    public DateOnly StartDate { get; set; }

    public virtual Staff Staff { get; set; } = null!;
}

