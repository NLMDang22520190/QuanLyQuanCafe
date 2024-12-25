using System;

namespace QuanLyQuanCafe.Server.Models.DTOs;

public class SaleFigureDTO
{
    public string Month { get; set; }
    public double TotalIncome { get; set; }
    public double TotalExpense { get; set; }

    public double TotalNetProfit { get; set; }
}
