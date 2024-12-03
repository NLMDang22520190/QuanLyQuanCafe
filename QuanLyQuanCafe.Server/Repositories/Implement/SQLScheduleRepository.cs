using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLScheduleRepository : CoffeeManagementRepository<Schedule>, IScheduleRepository
    {
        public SQLScheduleRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
