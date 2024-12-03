using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Staff
{
    public int StaffId { get; set; }

    public string FullName { get; set; } = null!;

    public string Role { get; set; } = null!;

    public DateOnly DateStartedWorking { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string? Address { get; set; }

    public virtual ICollection<Salary> Salaries { get; set; } = new List<Salary>();

    public virtual ICollection<Schedule> Schedules { get; set; } = new List<Schedule>();
}
