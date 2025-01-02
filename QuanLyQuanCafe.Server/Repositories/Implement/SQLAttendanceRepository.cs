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
            //var query = dbContext.Attendances
            //    .Include(a => a.Schedule)
            //    .ThenInclude(s => s.Staff)
            //    .ThenInclude(staff => staff.User)
            //    .Where(a => a.Schedule.ShiftId == shiftId && a.Date == date)
            //    .Select(a => new
            //    {
            //        a.Checkin,
            //        a.Checkout,
            //        StaffName = a.Schedule.Staff.User.UserName
            //    })
            //    .Distinct();
            var query = dbContext.Attendances
           .Include(a => a.Schedule)
           .ThenInclude(s => s.Staff)
           .ThenInclude(staff => staff.User)
           .Where(a => a.Schedule.ShiftId == shiftId && a.Date == date)
           .GroupBy(a => a.Schedule.StaffId)
           .Select(g => new
           {
               StaffName = g.First().Schedule.Staff.User.UserName,
               Checkin = g.First().Checkin,
               Checkout = g.First().Checkout
           });
            var totalRecords = await query.CountAsync();

            var results = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var staffAttendanceDtos = results.Select(r => new StaffAttendanceDto
            {
                StaffName = r.StaffName ?? "Unknown",
                Checkin = r.Checkin != default ? r.Checkin : (DateTime?)null,
                Checkout = r.Checkout != default ? r.Checkout : (DateTime?)null
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
        public async Task<PagedResult<AttendanceShiftDto>> GetAttendancesByUserIdAndMonthAsync(string userId, int month, int year, int pageIndex = 1, int pageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentException("User ID must be provided.");
            }

            if (month < 1 || month > 12)
            {
                throw new ArgumentException("Month must be between 1 and 12.");
            }

            if (year < 1)
            {
                throw new ArgumentException("Year must be greater than 0.");
            }

            if (pageIndex <= 0 || pageSize <= 0)
            {
                throw new ArgumentException("Page index and page size must be greater than zero.");
            }

            var staff = await dbContext.Staffs.FirstOrDefaultAsync(s => s.UserId == userId && s.DateEndWorking == null);
            if (staff == null)
            {
                throw new Exception("Staff not found for the given userId.");
            }

            var staffId = staff.StaffId;

            var query = dbContext.Attendances
                .Include(a => a.Schedule)
                .ThenInclude(s => s.Shift)
                .Where(a =>
                    a.Schedule.StaffId == staffId &&
                    a.Date.Month == month &&
                    a.Date.Year == year &&
                    a.Checkin != null &&
                    a.Checkout != null);

            var totalRecords = await query.CountAsync();

            var attendances = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var attendanceDtos = attendances.Select(a => new AttendanceShiftDto
            {
                AttendanceId = a.AttendanceId,
                ScheduleId = a.ScheduleId,
                Date = a.Date,
                Checkin = a.Checkin,
                Checkout = a.Checkout,
                ShiftName = a.Schedule.Shift.ShiftName
            }).ToList();

            return new PagedResult<AttendanceShiftDto>
            {
                TotalRecords = totalRecords,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize),
                Data = attendanceDtos
            };
        }


    }
}
