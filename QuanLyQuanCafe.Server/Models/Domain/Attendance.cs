using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;

[Table("Attendance")]
public partial class Attendance
{
    [Key]
    public int AttendanceId { get; set; }
    [Required]
    public int ScheduleId { get; set; }
    [Required]
    public DateOnly Date { get; set; }

    public DateTime Checkin { get; set; }
    public DateTime Checkout { get; set; }
    public virtual Schedule Schedule { get; set; } = null!;
}
