using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Migrations;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.Domain;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Models.DTOs;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLMonthSalaryRepository : CoffeeManagementRepository<MonthSalary>, IMonthSalaryRepository
    {
        public SQLMonthSalaryRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }

        public async Task UpdateWorkingHoursAsync(int salaryId, DateTime checkinTime, DateTime checkoutTime)
        {
            var workingHours = (checkoutTime - checkinTime).TotalHours;

            var monthSalary = await _dbSet.FirstOrDefaultAsync(ms => ms.SalaryId == salaryId
                && ms.Month == DateOnly.FromDateTime(checkoutTime).ToString("yyyy-MM"));

            if (monthSalary == null)
            {
                monthSalary = new MonthSalary
                {
                    SalaryId = salaryId,
                    Month = DateOnly.FromDateTime(checkoutTime).ToString("yyyy-MM"),
                    TotalHours = (int)workingHours
                };

                await dbContext.Set<MonthSalary>().AddAsync(monthSalary);
            }
            else
            {
                monthSalary.TotalHours += (int)workingHours;
            }

            await dbContext.SaveChangesAsync();
        }
        public async Task<PagedResult<MonthSalaryDto>> GetAllMonthSalariesByStaffIdAsync(int staffId, int pageIndex, int pageSize)
        {
            var salaryIds = await dbContext.Salaries
                .Where(s => s.StaffId == staffId)
                .Select(s => s.SalaryId)
                .ToListAsync();

            if (salaryIds.Count == 0)
            {
                return new PagedResult<MonthSalaryDto>();
            }
            var currentDate = DateTime.Now;
            var currentYear = currentDate.Year;
            var currentMonth = currentDate.Month;

            var currentYearMonth = $"{currentYear}-{currentMonth.ToString("D2")}";

            var query = dbContext.MonthSalaries
                .Where(ms => salaryIds.Contains(ms.SalaryId) &&
                             string.Compare(ms.Month, currentYearMonth) <= 0) 
                .Include(ms => ms.Salary);

            var totalRecords = await query.CountAsync();

            var monthSalaries = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var monthSalariesDto = monthSalaries.Select(a => new MonthSalaryDto
            {
                MSalaryId = a.MSalaryId,
                Month=a.Month,
                TotalHours=a.TotalHours,
                HourWage=a.Salary.HourWage
            }).ToList();

            return new PagedResult<MonthSalaryDto>
            {
                TotalRecords = totalRecords,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize),
                Data = monthSalariesDto
            };
        }

        public async Task<List<MonthSalaryStatisticDTO>> GetTotalMonthSalariesByMonthsAsync()
        {
            var totalMonthSalariesByMonth = await dbContext.MonthSalaries
                .Join(dbContext.Salaries,
                    ms => ms.SalaryId,
                    s => s.SalaryId,
                    (ms, s) => new { ms.Month, s.HourWage, ms.TotalHours })
                .GroupBy(ms => new { ms.Month, Period = 0 })
                .Select(ms => new MonthSalaryStatisticDTO
                {
                    Day = (ms.Key.Period * 5 + 1).ToString(),
                    Month = ms.Key.Month,
                    TotalHours = ms.Sum(m => m.TotalHours),
                    TotalSalaryPayed = ms.Sum(s => s.HourWage * s.TotalHours)
                })
                .ToListAsync();

            return totalMonthSalariesByMonth;
        }
        public async Task<List<MonthSalary>> CreateForRangeAsync(int salaryId, DateOnly startDate, DateOnly endDate)
        {
            if (startDate > endDate)
            {
                throw new ArgumentException("Start date must be earlier than or equal to the end date.");
            }

            var monthSalaries = new List<MonthSalary>();
            var currentDate = startDate;

            while (currentDate <= endDate)
            {
                var month = currentDate.ToString("yyyy-MM");

                var existingMonthSalary = await dbContext.MonthSalaries
                    .FirstOrDefaultAsync(ms => ms.SalaryId == salaryId && ms.Month == month);

                if (existingMonthSalary == null)
                {
                    var newMonthSalary = new MonthSalary
                    {
                        SalaryId = salaryId,
                        Month = month,
                        TotalHours = 0
                    };

                    monthSalaries.Add(newMonthSalary);
                    await dbContext.MonthSalaries.AddAsync(newMonthSalary);
                }

                currentDate = currentDate.AddMonths(1).AddDays(-currentDate.Day + 1); 
            }

            // Save all changes to the database
            await dbContext.SaveChangesAsync();

            return monthSalaries;
        }
        public async Task DeleteFutureMonthSalariesAsync(int salaryId, DateOnly startDate)
        {
            // Get the current month in "YYYY-MM" format
            string currentMonth = $"{startDate.Year}-{startDate.Month:D2}";

            var monthSalaries = await _dbSet
                .Where(ms => ms.SalaryId == salaryId && string.Compare(ms.Month, currentMonth) > 0)
                .ToListAsync();

            if (monthSalaries.Any())
            {
                _dbSet.RemoveRange(monthSalaries);
                await dbContext.SaveChangesAsync();
            }
        }


    }



}
