using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class CustomerDetail
{
    public int CustomerId { get; set; }

    public int UserId { get; set; }

    public string CustomerName { get; set; } = null!;

    public DateOnly? CustomerBirthday { get; set; }

    public string CustomerPhone { get; set; } = null!;

    public string? CustomerAddress { get; set; }

    public int? CustomerPoint { get; set; }

    public string? CustomerStatus { get; set; }

    public string? AccountStatus { get; set; }

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
