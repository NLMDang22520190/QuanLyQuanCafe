namespace QuanLyQuanCafe.Server.Models.DTO.ADD
{
    public class AddItemRequestDTO
    {
        public string ItemName { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Price { get; set; }

        public int TypeOfFoodId { get; set; }
        public string? State { get; } = "Còn hàng";

        public string Picture { get; set; } = null!;

        public virtual List<AddItemRecipeRequestDTO> ItemRecipes { get; set; } = null!;

        //public List<AddItemRecipeRequestDTO> ItemRecipes { get; set; } = new List<AddItemRecipeRequestDTO>();
    }
}
