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
        public async Task<List<Schedule>> GetSchedulesForMonthAsync(int year, int month)
        {
            var firstDayOfMonth = new DateOnly(year, month, 1);
            var lastDayOfMonth = firstDayOfMonth.AddMonths(1).AddDays(-1); 

            var schedules = await _dbSet
                .Where(s => s.StartDate >= firstDayOfMonth && s.StartDate <= lastDayOfMonth ||
                            s.EndDate >= firstDayOfMonth && s.EndDate <= lastDayOfMonth)
                .ToListAsync();

            return schedules;
        }
        public async Task<List<Schedule>> GetStaffWeeklySchedulesAsync(int staffId, DateOnly startDate)
        {
            DateOnly endDate = startDate.AddDays(6);

            var schedules = await dbContext.Schedules
                .Where(s => s.StaffId == staffId &&
                            s.StartDate <= endDate &&
                            s.EndDate >= startDate)
                .Include(s => s.Shift) 
                .ToListAsync();

            return schedules;
        }
        
    }
}
