using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLOrderDetailRepository : CoffeeManagementRepository<OrderDetail>, IOrderDetailRepository
    {
        public SQLOrderDetailRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
