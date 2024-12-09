namespace QuanLyQuanCafe.Server.Models.DTO.GET
{
    public class FeatureMenuItem
    {
        public int ItemId { get; set; }

        public string ItemName { get; set; } = null!;

       
        public double Price { get; set; }

        public string? Picture { get; set; }

    }
}
