namespace QuanLyQuanCafe.Server.Models.DTO.GET
{
    public class FeatureMenuItemDTO
    {
        public int ItemId { get; set; }

        public string ItemName { get; set; } = null!;

        public string Description { get; set; } = null!;

        public double Price { get; set; }

        public string? Picture { get; set; }

        public string? State { get; set; }

    }
}
