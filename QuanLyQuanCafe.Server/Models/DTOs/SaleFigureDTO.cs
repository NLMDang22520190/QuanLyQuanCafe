using System;

namespace QuanLyQuanCafe.Server.Models.DTOs;

public class SaleFigureDTO
{
    public string period { get; set; }  
    public double TotalIncome { get; set; }
    public double TotalExpense { get; set; }

    public double TotalNetProfit { get; set; }
}
