using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Attendance
{
    public int AttendanceId { get; set; }

    public int ScheduleId { get; set; }

    public DateOnly Date { get; set; }

    public bool IsAbsent { get; set; }

    public virtual Schedule Schedule { get; set; } = null!;
}
