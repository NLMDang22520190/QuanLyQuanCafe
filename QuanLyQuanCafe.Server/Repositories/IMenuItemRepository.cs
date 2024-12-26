using QuanLyQuanCafe.Server.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IMenuItemRepository : ICoffeeManagementRepository<MenuItem>
    {
        IQueryable<MenuItem> GetMostSoldMenuItems();
        IQueryable<MenuItem> GetLeastSoldMenuItems();
        Task<List<MenuItem>> GetAllWithRecipesAsync();
        Task<MenuItem?> GetMenuItemWithRecipesByIdAsync(int itemId);
        Task<List<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId);
        Task<List<MenuItem>> GetFeatureMenuItemAsync();
    }
}
