using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLVoucherDetailRepository : CoffeeManagementRepository<VoucherDetail>, IVoucherDetailRepository
    {
        public SQLVoucherDetailRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
