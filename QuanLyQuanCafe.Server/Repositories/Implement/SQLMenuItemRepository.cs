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
