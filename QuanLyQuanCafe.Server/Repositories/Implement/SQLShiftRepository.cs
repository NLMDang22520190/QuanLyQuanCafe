using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLShiftRepository : CoffeeManagementRepository<Shift>, IShiftRepository
    {
        public SQLShiftRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
