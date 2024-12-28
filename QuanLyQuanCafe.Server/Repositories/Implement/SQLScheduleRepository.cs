using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLScheduleRepository : CoffeeManagementRepository<Schedule>, IScheduleRepository
    {
        public SQLScheduleRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {

        }
        public async Task<ScheduleDto?> UpdateEndDateAsync(int scheduleId, DateOnly newEndDate)
        {
            var schedule = await _dbSet.FirstOrDefaultAsync(s => s.ScheduleId == scheduleId);

            if (schedule == null)
            {
                return null;
            }

            schedule.EndDate = newEndDate;

            await dbContext.SaveChangesAsync();

            return new ScheduleDto
            {
                ScheduleId = schedule.ScheduleId,
                StaffId = schedule.StaffId,
                StartDate = schedule.StartDate,
                EndDate = schedule.EndDate,
                ShiftId = schedule.ShiftId
            };
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
        public async Task<ScheduleDto?> CreateScheduleAsync(ScheduleDto scheduleDto)
        {
            var conflictingSchedules = await _dbSet
                .Where(s => s.StaffId == scheduleDto.StaffId &&
                            (s.StartDate <= scheduleDto.EndDate && s.EndDate >= scheduleDto.StartDate))
                .ToListAsync();

            if (conflictingSchedules.Any())
            {
                throw new InvalidOperationException("The schedule conflicts with an existing schedule.");
            }

            var newSchedule = new Schedule
            {
                StaffId = scheduleDto.StaffId,
                StartDate = scheduleDto.StartDate,
                EndDate = scheduleDto.EndDate,
                ShiftId = scheduleDto.ShiftId
            };

            await _dbSet.AddAsync(newSchedule);
            await dbContext.SaveChangesAsync();

            return new ScheduleDto
            {
                ScheduleId = newSchedule.ScheduleId,
                StaffId = newSchedule.StaffId,
                StartDate = newSchedule.StartDate,
                EndDate = newSchedule.EndDate,
                ShiftId = newSchedule.ShiftId
            };
        }


    }
}
