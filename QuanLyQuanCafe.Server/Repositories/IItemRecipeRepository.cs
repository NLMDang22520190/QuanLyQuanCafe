using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IItemRecipeRepository : ICoffeeManagementRepository<ItemRecipe>
    {
        Task<List<ItemRecipe>> GetItemRecipeByItemId(int itemId);
        Task<bool> DeleteItemRecipeByItemId(int itemId);
    }
}
