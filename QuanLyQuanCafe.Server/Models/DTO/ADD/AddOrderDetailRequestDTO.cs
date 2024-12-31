using System;

namespace QuanLyQuanCafe.Server.Models.DTO.ADD;

public class AddOrderDetailRequestDTO
{
    public int itemId { get; set; } 
    public int quantity { get; set; }
    public string? note { get; set; }
    public string? adjustment { get; set; }
}
