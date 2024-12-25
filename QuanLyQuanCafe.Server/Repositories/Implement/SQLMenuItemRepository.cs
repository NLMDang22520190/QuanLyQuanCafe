
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
            var mostSoldMenuItems = this.GetLeastSoldMenuItems().Reverse();
            return mostSoldMenuItems;
        }

        public Task<List<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId)
        {
            var menuItems = dbContext.MenuItems
                .Where(x => x.TypeOfFoodId == categoryId)
                .ToListAsync();

            return menuItems;
        }

        public async Task<List<MenuItem>> GetFeatureMenuItemAsync()
        {
            var randomMenuItems = await dbContext.MenuItems
                .OrderBy(x => Guid.NewGuid()) // Sắp xếp ngẫu nhiên
                .Take(8) // Lấy 8 món ăn ngẫu nhiên
                .ToListAsync();

            return randomMenuItems;
        }
    }
}
