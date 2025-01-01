namespace QuanLyQuanCafe.Server.Models.DTO.UPDATE
{
    public class UpdateCartItemRequestDTO
    {
        public int CartDetailId { get; set; }
        public int Quantity { get; set; }
        public string? Notes { get; set; }
        public string? Adjustments { get; set; }
    }
}
