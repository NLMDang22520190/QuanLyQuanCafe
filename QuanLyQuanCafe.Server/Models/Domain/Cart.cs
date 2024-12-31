using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyQuanCafe.Server.Models;

public partial class Cart
{
	[Key]
	public int CartId { get; set; }

	[ForeignKey("User")]
	public string? UserId { get; set; }

	public DateTime LastUpdated { get; set; }

	// Navigation property to link CartDetails
	public virtual ICollection<CartDetail> CartDetails { get; set; } = new List<CartDetail>();

	// Navigation property to User
	public virtual ApplicationUser User { get; set; } = null!;
}
