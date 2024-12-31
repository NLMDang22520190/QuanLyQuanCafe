using System;

namespace QuanLyQuanCafe.Server.Models.DTO.GET;

public class OrderDetailDTO
{
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public string? ItemName { get; set; }
        public decimal ItemPrice { get; set; }
}
