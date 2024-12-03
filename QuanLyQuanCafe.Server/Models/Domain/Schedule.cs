using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Schedule
{
    public int ScheduleId { get; set; }

    public int StaffId { get; set; }

    public string DayOfWeek { get; set; } = null!;

    public int ShiftId { get; set; }

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();

    public virtual Shift Shift { get; set; } = null!;

    public virtual Staff Staff { get; set; } = null!;
}
