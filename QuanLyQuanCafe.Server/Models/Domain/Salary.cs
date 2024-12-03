using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Salary
{
    public int SalaryId { get; set; }

    public int StaffId { get; set; }

    public int HourWorked { get; set; }

    public double SalaryBase { get; set; }

    public double Factor { get; set; }

    public double SalaryEarned { get; set; }

    public DateOnly Date { get; set; }

    public bool IsPaid { get; set; }

    public virtual Staff Staff { get; set; } = null!;
}
