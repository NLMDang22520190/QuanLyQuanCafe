
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;

using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLMenuItemRepository : CoffeeManagementRepository<MenuItem>, IMenuItemRepository
    {
        private readonly CoffeeManagementContext _dbContext;

        public SQLMenuItemRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<MenuItem> GetLeastSoldMenuItems()
        {
            var leastSoldMenuItems = (
            from menuItem in _dbContext.MenuItems
            join orderDetail in _dbContext.OrderDetails on menuItem.ItemId equals orderDetail.ItemId into menuItemOrderDetails
            let totalQuantitySold = menuItemOrderDetails.Sum(od => od.Quantity)
            orderby totalQuantitySold ascending
            select new MenuItem
            {
                ItemId = menuItem.ItemId,
                ItemName = menuItem.ItemName,
                Price = menuItem.Price,
                Picture = menuItem.Picture,
                TypeOfFoodId = menuItem.TypeOfFoodId,
                TypeOfFood = menuItem.TypeOfFood,
                OrderDetails = menuItem.OrderDetails,
            }).Take(10).AsQueryable();
            return leastSoldMenuItems;
        }

        public IQueryable<MenuItem> GetMostSoldMenuItems()
        {
            var mostSoldMenuItems = (
            from menuItem in _dbContext.MenuItems
            join orderDetail in _dbContext.OrderDetails on menuItem.ItemId equals orderDetail.ItemId into menuItemOrderDetails
            let totalQuantitySold = menuItemOrderDetails.Sum(od => od.Quantity)
            orderby totalQuantitySold descending
            select new MenuItem
            {
                ItemId = menuItem.ItemId,
                ItemName = menuItem.ItemName,
                Price = menuItem.Price,
                Picture = menuItem.Picture,
                TypeOfFoodId = menuItem.TypeOfFoodId,
                TypeOfFood = menuItem.TypeOfFood,
                OrderDetails = menuItem.OrderDetails,
            }).Take(10).AsQueryable();
            return mostSoldMenuItems;
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
