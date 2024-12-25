using System;

namespace QuanLyQuanCafe.Server.Models.DTOs;

public class ImportRecordStatisticDTO
{
    public string Day { get; set; }
    public string Month { get; set; }
    public double TotalImportPrice { get; set; }
}
