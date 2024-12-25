namespace QuanLyQuanCafe.Server.Models.DTO.GET
{
    public class ItemRecipeDTO
    {
        public int ItemId { get; set; }

        public int IngredientId { get; set; }

        public int Quantity { get; set; }

        public virtual MenuItemInRecipeDTO Item { get; set; } = null!;

        public virtual IngredientInRecipeDTO Ingredient { get; set; } = null!;
    }
}
