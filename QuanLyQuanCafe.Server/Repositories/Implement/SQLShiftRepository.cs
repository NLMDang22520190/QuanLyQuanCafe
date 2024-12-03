using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLShiftRepository : CoffeeManagementRepository<Shift>, IShiftRepositoryRepository
    {
        public SQLShiftRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
