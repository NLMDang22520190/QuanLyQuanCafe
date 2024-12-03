using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLStaffRepository : CoffeeManagementRepository<Staff>, IStaffRepository
    {
        public SQLStaffRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
