using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLCartRepository : CoffeeManagementRepository<Cart>, ICartRepository
    {
        public SQLCartRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}

