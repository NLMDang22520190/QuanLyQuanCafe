﻿using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public string OrderState { get; set; } = null!;

    public int CustomerId { get; set; }

    public double TotalPrice { get; set; }

    public DateTime OrderTime { get; set; }

    public int? VoucherApplied { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public virtual CustomerDetail Customer { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
