namespace QuanLyQuanCafe.Server.Models.DTO.UPDATE
{
    public class UpdateItemRecipeRequestDTO
    {
        public int ItemId { get; set; }

        public int IngredientId { get; set; }

        public int Quantity { get; set; }
    }
}
