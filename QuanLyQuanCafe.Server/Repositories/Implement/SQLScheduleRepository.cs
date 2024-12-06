using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLScheduleRepository : CoffeeManagementRepository<Schedule>, IScheduleRepository
    {
        public SQLScheduleRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {

        }
        public async Task<Schedule?> UpdateEndDateAsync(int scheduleId, DateOnly newEndDate)
        {
            var schedule = await _dbSet.FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);

            if (schedule == null)
            {
                return null;
            }

            schedule.EndDate = newEndDate;

            await dbContext.SaveChangesAsync();

            return schedule;
        }
    }
}
