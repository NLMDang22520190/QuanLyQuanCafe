using System;

namespace QuanLyQuanCafe.Server.Models.DTOs;

public class OrderStatisticDTO
{
    public string Day { get; set; } 
    public string Month { get; set; }
    public double TotalIncome { get; set; }
}
