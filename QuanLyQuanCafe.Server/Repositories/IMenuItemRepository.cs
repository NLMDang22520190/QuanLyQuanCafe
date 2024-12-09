using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IMenuItemRepository : ICoffeeManagementRepository<MenuItem>
    {
        Task<List<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId);
        Task<List<MenuItem>> GetFeatureMenuItemAsync();
    }
}
