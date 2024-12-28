using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;

public partial class Cart
{
    public int CartId { get; set; }
      
    public string? UserId { get; set; }

    public DateTime LastUpdated { get; set; }

    //public virtual ICollection<CartDetail> CartDetails { get; set; } = new List<CartDetail>();
    [ForeignKey("UserId")]
    public virtual ApplicationUser User { get; set; } = null!;
}
