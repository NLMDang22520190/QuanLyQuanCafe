using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Repositories;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLAttendanceRepository : CoffeeManagementRepository<Attendance>, IAttendanceRepository
    {
        public SQLAttendanceRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
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

        public async Task<AttendanceDto?> CheckInAsync(string userId, int shiftId, DateTime checkinTime)
        {
            var staff = await dbContext.Staffs.FirstOrDefaultAsync(s => s.UserId == userId && s.DateEndWorking == null);
            if (staff == null)
            {
                throw new Exception("Staff not found for the given userId.");
            }

            var staffId = staff.StaffId;

            var schedule = await dbContext.Schedules.FirstOrDefaultAsync(s =>
                s.StaffId == staffId &&
                s.ShiftId == shiftId &&
                s.StartDate <= DateOnly.FromDateTime(checkinTime) &&
                s.EndDate >= DateOnly.FromDateTime(checkinTime));

            if (schedule == null)
            {
                throw new Exception("Schedule not found for the given staffId, shiftId, and date.");
            }

            var scheduleId = schedule.ScheduleId;

            var attendanceDate = DateOnly.FromDateTime(checkinTime);
            var attendance = await _dbSet.FirstOrDefaultAsync(a =>
                a.ScheduleId == scheduleId &&
                a.Date == attendanceDate);

            if (attendance == null)
            {
                throw new Exception("Attendance not found for the given staffId, shiftId, and date.");
            }
            else
            {
                attendance.Checkin = checkinTime;
            }

            await dbContext.SaveChangesAsync();
            return new AttendanceDto {
                AttendanceId=attendance.AttendanceId,
                Checkin=attendance.Checkin,
                Checkout=attendance.Checkout,
                Date=attendance.Date,
                ScheduleId=scheduleId,
            };
        }

        // Check-out
        public async Task<AttendanceDto?> CheckOutAsync(string userId, int shiftId, DateTime checkinTime, DateTime checkoutTime)
        {
            var staff = await dbContext.Staffs.FirstOrDefaultAsync(s => s.UserId == userId && s.DateEndWorking == null);
            if (staff == null)
            {
                throw new Exception("Staff not found for the given userId.");
            }

            var staffId = staff.StaffId;

            var schedule = await dbContext.Schedules.FirstOrDefaultAsync(s =>
                s.StaffId == staffId &&
                s.ShiftId == shiftId &&
                s.StartDate <= DateOnly.FromDateTime(checkinTime) &&
                s.EndDate >= DateOnly.FromDateTime(checkinTime));

            if (schedule == null)
            {
                throw new Exception("Schedule not found for the given staffId, shiftId, and date.");
            }
            var scheduleId = schedule.ScheduleId;

            var attendance = await _dbSet.FirstOrDefaultAsync(a => a.ScheduleId == scheduleId 
                && a.Date == DateOnly.FromDateTime(checkoutTime)
                && a.Checkin!= default(DateTime));
            if (attendance == null || attendance.Checkin.Date != checkoutTime.Date)
            {
                return null;
            }

            attendance.Checkout = checkoutTime;
            await dbContext.SaveChangesAsync();
            return new AttendanceDto {
                AttendanceId = attendance.AttendanceId,
                Checkin = attendance.Checkin,
                Checkout = attendance.Checkout,
                Date = attendance.Date,
                ScheduleId = scheduleId,
            };
        }


        public async Task<PagedResult<StaffAttendanceDto>> GetStaffAttendanceForShiftOnDateAsync(
            int shiftId, DateOnly date, int pageIndex, int pageSize)
        {
            try
            {
                Console.WriteLine($"Fetching attendances for ShiftId: {shiftId}, Date: {date}, PageIndex: {pageIndex}, PageSize: {pageSize}");

                var query = dbContext.Attendances
                    .Include(a => a.Schedule)
                    .ThenInclude(s => s.Staff)
                    .Where(a => a.Schedule.ShiftId == shiftId && a.Date == date);

                var totalRecords = await query.CountAsync();

                var attendances = await query
                    .Skip((pageIndex - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                var staffAttendanceDtos = attendances.Select(a => new StaffAttendanceDto
                {
                    StaffName = a.Schedule.Staff.User.UserName ?? "Unknown",
                    Checkin = a.Checkin,
                    Checkout = a.Checkout
                }).ToList();

                return new PagedResult<StaffAttendanceDto>
                {
                    TotalRecords = totalRecords,
                    CurrentPage = pageIndex,
                    PageSize = pageSize,
                    TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize),
                    Data = staffAttendanceDtos
                };
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in repository: {ex.Message}");
                throw;
            }
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

        public async Task<AttendanceDto?> GetAttendanceByUserIdShiftIdDate(string userId, int shiftId, DateOnly date)
        {
            var staff = await dbContext.Staffs.FirstOrDefaultAsync(s => s.UserId == userId && s.DateEndWorking == null);
            if (staff == null)
            {
                throw new Exception("Staff not found for the given userId.");
            }

            var schedule = await dbContext.Schedules.FirstOrDefaultAsync(s =>
                s.StaffId == staff.StaffId &&
                s.ShiftId == shiftId &&
                s.StartDate <= date &&
                s.EndDate >= date);

            if (schedule == null)
            {
                throw new Exception("Schedule not found for the given staffId, shiftId, and date.");
            }

            var attendance = await dbContext.Attendances.FirstOrDefaultAsync(a =>
                a.ScheduleId == schedule.ScheduleId &&
                a.Date == date);

            if (attendance == null)
            {
                return null; 
            }

            return new AttendanceDto
            {
                AttendanceId = attendance.AttendanceId,
                ScheduleId = attendance.ScheduleId,
                Date = attendance.Date,
                Checkin = attendance.Checkin,
                Checkout = attendance.Checkout
            };
        }

    }
}
