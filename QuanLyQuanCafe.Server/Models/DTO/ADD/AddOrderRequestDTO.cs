using System;

namespace QuanLyQuanCafe.Server.Models.DTO.ADD;

public class AddOrderRequestDTO
{
    public string? UserId { get; set; }
   
    public string OrderState { get; set; } = "Pending";
    public DateTime OrderTime { get; set; } = DateTime.Now;
    public int? voucherApplied { get; set; } = null;
    public required string PaymentMethod { get; set; }
    public required List<AddOrderDetailRequestDTO> OrderDetails { get; set; } = new List<AddOrderDetailRequestDTO>();
}
