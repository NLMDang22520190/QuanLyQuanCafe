using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLAttendanceRepository : CoffeeManagementRepository<Attendance>, IAttendanceRepository
    {
        public SQLAttendanceRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
        public async Task<Attendance?> GetAttendanceByScheduleIdAndDateAsync(int scheduleId, DateOnly date)
        {
            return await _dbSet
                .FirstOrDefaultAsync(a => a.ScheduleId == scheduleId && a.Date == date);
        }

        public async Task DeleteAttendancesForRangeAsync(int scheduleId, DateOnly startDate, DateOnly endDate)
        {
            if (startDate > endDate)
            {
                throw new ArgumentException("startDate cannot be later than endDate.");
            }

            var attendancesToDelete = await _dbSet
                .Where(a => a.ScheduleId == scheduleId &&
                            a.Date >= startDate &&
                            a.Date <= endDate)
                .ToListAsync();

            if (attendancesToDelete.Count == 0)
            {
                throw new ArgumentException("No attendances found for the specified range.");
            }

            _dbSet.RemoveRange(attendancesToDelete);
            await dbContext.SaveChangesAsync();
        }

        // Check-in
        public async Task<Attendance?> CheckInAsync(int scheduleId, DateTime checkinTime)
        {
            var attendance = await _dbSet.FirstOrDefaultAsync(a => a.ScheduleId == scheduleId 
                && a.Date == DateOnly.FromDateTime(checkinTime));

            if (attendance == null)
            {
                return null;
            }

            attendance.Checkin = checkinTime;
            await dbContext.SaveChangesAsync();
            return attendance;
        }

        // Check-out
        public async Task<Attendance?> CheckOutAsync(int scheduleId, DateTime checkoutTime)
        {
            var attendance = await _dbSet.FirstOrDefaultAsync(a => a.ScheduleId == scheduleId 
                && a.Date == DateOnly.FromDateTime(checkoutTime)
                && a.Checkin!= default(DateTime));
            if (attendance == null || attendance.Checkin.Date != checkoutTime.Date)
            {
                return null;
            }

            attendance.Checkout = checkoutTime;
            await dbContext.SaveChangesAsync();
            return attendance;
        }
        
        public async Task<List<Attendance>> GetAttendanceByDateAsync(DateOnly date)
        {
            return await _dbSet.Where(a => a.Date == date).ToListAsync();
        }
        public async Task<List<Attendance>> CreateAttendancesForRangeAsync(int scheduleId, DateOnly startDate, DateOnly endDate)
        {
            
            if (startDate > endDate)
            {
                throw new ArgumentException("startDate cannot be later than endDate.");
            }

            var attendances = new List<Attendance>();

            
            for (var date = startDate; date <= endDate; date = date.AddDays(1))
            {
                var attendance = new Attendance
                {
                    ScheduleId = scheduleId,
                    Date = date, 
                    Checkin = default(DateTime), 
                    Checkout = default(DateTime) 
                };

                attendances.Add(attendance);
            }

            await _dbSet.AddRangeAsync(attendances);
            await dbContext.SaveChangesAsync();

            return attendances; 
        }
    }
}
