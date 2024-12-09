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
            throw new NotImplementedException();
        }

        public Task<List<MenuItem>> GetFeatureMenuItemAsync()
        {
            throw new NotImplementedException();
        }
    }
}
