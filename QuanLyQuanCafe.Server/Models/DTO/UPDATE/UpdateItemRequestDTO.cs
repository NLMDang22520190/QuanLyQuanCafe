namespace QuanLyQuanCafe.Server.Models.DTO.UPDATE
{
    public class UpdateItemRequestDTO
    {
        public int ItemId { get; set; }
        public string ItemName { get; set; } = null!;
        public double Price { get; set; }
        public string? Description { get; set; }
        public string? Picture { get; set; }
        public int TypeOfFoodId { get; set; }
    }
}
