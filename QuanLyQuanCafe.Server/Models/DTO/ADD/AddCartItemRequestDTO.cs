namespace QuanLyQuanCafe.Server.Models.DTO.ADD
{
	public class AddCartItemRequestDTO
	{
		public string UserId { get; set; }
		public int ItemId { get; set; }
		public int Quantity { get; set; }
		public string? Notes { get; set; }
		public string? Adjustments { get; set; }
	}
}
