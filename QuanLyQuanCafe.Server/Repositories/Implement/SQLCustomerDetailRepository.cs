using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLCustomerDetailRepository : CoffeeManagementRepository<CustomerDetail>, ICustomerDetailRepository
    {
        public SQLCustomerDetailRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}

