using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLAttendanceRepository : CoffeeManagementRepository<Attendance>, IAttendanceRepository
    {
        public SQLAttendanceRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
