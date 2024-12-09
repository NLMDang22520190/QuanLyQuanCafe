using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IIngredientRepository : ICoffeeManagementRepository<Ingredient>
    {
       
        Task<Ingredient>InscreaseQuantityAsync(int ingredientId, int  quantity);
        Task<List<Ingredient>> DecreaseQuantityAsync(int menuItemId);

    }
}
