using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLMenuItemRepository : CoffeeManagementRepository<MenuItem>, IMenuItemRepository
    {
        public SQLMenuItemRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
