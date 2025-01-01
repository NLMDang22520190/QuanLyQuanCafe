﻿using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public string OrderState { get; set; } = null!;

    public string? UserId { get; set; }

    public double TotalPrice { get; set; }

    public DateTime OrderTime { get; set; }

    public int? VoucherApplied { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public string? FullName { get; set; } = null!;
    public string? PhoneNumber { get; set; } = null!;
    public string? Address { get; set; } = null!;


    public virtual ApplicationUser User { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}