﻿namespace QuanLyQuanCafe.Server.Models.DTO.GET
{
    public class CartItemDTO
    {
        public string ItemName { get; set; } = null!;
        public double Price { get; set; }

        public string? Picture { get; set; } = null!;
    }
}
