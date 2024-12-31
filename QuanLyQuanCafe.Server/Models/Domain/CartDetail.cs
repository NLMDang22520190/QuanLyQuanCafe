using System.ComponentModel.DataAnnotations;

namespace QuanLyQuanCafe.Server.Models
{
	public class CartDetail
	{
		[Key]
		public int CartDetailId { get; set; }
		public int CartId { get; set; }
		public int ItemId { get; set; }
		public int Quantity { get; set; }
		public string Notes { get; set; }
		public string Adjustments { get; set; }

		public virtual Cart Cart { get; set; }
		public virtual MenuItem Item { get; set; }
	}
}
