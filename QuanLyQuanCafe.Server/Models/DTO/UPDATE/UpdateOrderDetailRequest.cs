namespace QuanLyQuanCafe.Server.Models.DTOs;

public class UpdateOrderDetailRequest
{
	public int? Quantity { get; set; } // Số lượng
	public string? Notes { get; set; } // Ghi chú
	public string? Adjustments { get; set; } // Tùy chỉnh
}
