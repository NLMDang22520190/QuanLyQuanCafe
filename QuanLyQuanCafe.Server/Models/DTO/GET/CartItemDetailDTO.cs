﻿namespace QuanLyQuanCafe.Server.Models.DTO.GET
{
    public class CartItemDetailDTO
    {
        public int CartDetailId { get; set; }
        public int CartId { get; set; }
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
        public string? Adjustments { get; set; }

        public virtual CartItemDTO Item { get; set; } = null!;
    }
}
