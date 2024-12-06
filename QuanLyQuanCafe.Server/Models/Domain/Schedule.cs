using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;
[Table("Schedule")]
public partial class Schedule
{
    [Key]
    public int ScheduleId { get; set; }
    public int StaffId { get; set; }

    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    public int ShiftId { get; set; }

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();

    public virtual Shift Shift { get; set; } = null!;

    public virtual Staff Staff { get; set; } = null!;
}
