using System;

namespace QuanLyQuanCafe.Server.Models.DTO.GET;

public class OrderDTO
{
        public int OrderId { get; set; }
        public UserInfoDTO User { get; set; }
        public string DiningOption { get; set; }
        public string PaymentMethod { get; set; }
        public VoucherDTO VoucherApplied { get; set; }
        public string Currency { get; set; }
        public string orderState { get; set; }
        public DateTime OrderTime { get; set; }
        public decimal TotalPrice { get; set; }
        public List<OrderDetailDTO> OrderDetails { get; set; }
}
