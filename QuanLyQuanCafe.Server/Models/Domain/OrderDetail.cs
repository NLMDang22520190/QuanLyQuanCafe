using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class OrderDetail
{
    public int OrderDetailId { get; set; }

    public int OrderId { get; set; }

    public int ItemId { get; set; }

    public int Quantity { get; set; }

    public string? Notes { get; set; }

    public string? Adjustments { get; set; }

    public virtual MenuItem Item { get; set; } = null!;

    public virtual Order Order { get; set; } = null!;
}
