using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class VoucherDetail
{
    public int VoucherId { get; set; }

    public string VoucherName { get; set; } = null!;

    public DateOnly VoucherStartDate { get; set; }

    public string VoucherCode { get; set; } = null!;

    public DateOnly VoucherEndDate { get; set; }

    public int PercentDiscount { get; set; }
}
