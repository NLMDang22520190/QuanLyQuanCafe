using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLOrderRepository : CoffeeManagementRepository<Order>, IOrderRepository
    {
        public SQLOrderRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
