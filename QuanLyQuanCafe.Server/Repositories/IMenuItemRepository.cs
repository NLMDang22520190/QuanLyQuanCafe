using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface IMenuItemRepository : ICoffeeManagementRepository<MenuItem>
	{
		Task<List<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId);
		Task<List<MenuItem>> GetFeatureMenuItemAsync();
		Task<List<MenuItem>> GetAllMenuItemsAsync();
		Task<MenuItem?> GetMenuItemByIdAsync(int menuItemId);
	}
}
