using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
	public class SQLMenuItemRepository : CoffeeManagementRepository<MenuItem>, IMenuItemRepository
	{
		private readonly CoffeeManagementContext dbContext;

		public SQLMenuItemRepository(CoffeeManagementContext dbContext) : base(dbContext)
		{
			this.dbContext = dbContext;
		}

		// Get all menu items
		public async Task<List<MenuItem>> GetAllMenuItemsAsync()
		{
			return await dbContext.MenuItems.ToListAsync();
		}

		// Get menu item by ID
		public async Task<MenuItem?> GetMenuItemByIdAsync(int ItemId)
		{
			return await dbContext.MenuItems.FirstOrDefaultAsync(x => x.ItemId == ItemId);
		}

		// Get menu items by category ID
		public Task<List<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId)
		{
			var menuItems = dbContext.MenuItems
				.Where(x => x.TypeOfFoodId == categoryId)
				.ToListAsync();

			return menuItems;
		}

		// Get feature menu items (random 8 items)
		public async Task<List<MenuItem>> GetFeatureMenuItemAsync()
		{
			var randomMenuItems = await dbContext.MenuItems
				.OrderBy(x => Guid.NewGuid()) // Randomly order
				.Take(8) // Take 8 random menu items
				.ToListAsync();

			return randomMenuItems;
		}
	}
}
