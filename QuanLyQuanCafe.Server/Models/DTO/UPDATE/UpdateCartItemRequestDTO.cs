namespace QuanLyQuanCafe.Server.Models.DTO.UPDATE
{
    public class UpdateCartItemRequestDTO
    {
		public int CartId { get; set; } // The ID of the cart
		public int CartDetailId { get; set; } // The ID of the specific item to update
		public int Quantity { get; set; } // The new quantity for the item
		public string Notes { get; set; } // New notes for the item
		public string Adjustment { get; set; } // The new adjustment (size, etc.)
	}
}
