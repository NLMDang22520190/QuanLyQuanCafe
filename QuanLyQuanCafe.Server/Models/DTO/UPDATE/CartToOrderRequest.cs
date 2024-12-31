namespace QuanLyQuanCafe.Server.Models.DTO.UPDATE
{
	public class CartToOrderRequest
	{
		public string UserId { get; set; }

		public string PaymentMethod { get; set; }

		public int? VoucherId { get; set; }
	}

	public class OrderCreateDTO
	{
		public string UserId { get; set; }
		public string PaymentMethod { get; set; }
		public int? VoucherId { get; set; }
		public List<CartDetailDTO> CartDetails { get; set; }
	}
	public class CartDetailDTO
	{
		public int ItemId { get; set; }
		public int Quantity { get; set; }
		public string Notes { get; set; }
		public string Adjustments { get; set; }
	}
}
