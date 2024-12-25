using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;
public partial class ApplicationUser:IdentityUser
{
    public string? District { get; set; }
    public string? City { get; set; }
    public string? PhotoUrl { get; set; }
    public string? Ward { get; set; }
    public int? CustomerId { get; set; }

    public virtual CustomerDetail? Customer { get; set; }
    public virtual ICollection<Staff>? Staffs { get; set; } = new List<Staff>();
}
