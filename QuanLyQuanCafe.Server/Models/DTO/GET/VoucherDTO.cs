using System;

namespace QuanLyQuanCafe.Server.Models.DTO.GET;

public class VoucherDTO
{
    public string VoucherName { get; set; }
    public string VoucherCode { get; set; }
    public DateTime VoucherStartDate { get; set; }
    public DateTime VoucherEndDate { get; set; }
   
    public int PercentDiscount { get; set; }
}
