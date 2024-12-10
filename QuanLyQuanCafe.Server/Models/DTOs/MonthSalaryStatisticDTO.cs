using System;

namespace QuanLyQuanCafe.Server.Models.DTOs;

public class MonthSalaryStatisticDTO
{
    public string Month { get; set; }
    public int TotalHours { get; set; }
    public decimal TotalSalaryPayed { get; set; }
}
