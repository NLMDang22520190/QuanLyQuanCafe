using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;
[Table("Staff")]
public partial class Staff
{
    [Key]
    public  int StaffId { get; set; }


    public required string? UserId { get; set; } 

    [ForeignKey("UserId")]
    public virtual required ApplicationUser User { get; set; }

    [Required]
    public DateTime DateStartedWorking { get; set; } 

    public DateTime? DateEndWorking { get; set; }

    public virtual ICollection<Salary> Salaries { get; set; } = new List<Salary>();

    public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
}
