using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLCartDetailRepository : CoffeeManagementRepository<CartDetail>, ICartDetailRepository
    {
        public SQLCartDetailRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}

