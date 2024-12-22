using System;
using System.Collections.Generic;

namespace QuanLyQuanCafe.Server.Models;

public partial class Cart
{
    public int CartId { get; set; }

    public int CustomerId { get; set; }

    public DateTime LastUpdated { get; set; }

    //public virtual ICollection<CartDetail> CartDetails { get; set; } = new List<CartDetail>();

    public virtual CustomerDetail Customer { get; set; } = null!;
}
