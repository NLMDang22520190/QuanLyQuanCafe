using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.Domain;

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
        public async Task<List<MonthSalary>> GetAllMonthSalariesByStaffIdAsync(int staffId)
        {
            var salaryIds = await dbContext.Salaries
                .Where(s => s.StaffId == staffId)
                .Select(s => s.SalaryId)
                .ToListAsync();

            if (salaryIds.Count == 0)
            {
                return new List<MonthSalary>(); 
            }

            var monthSalaries = await _dbSet
                .Where(ms => salaryIds.Contains(ms.SalaryId))
                .ToListAsync();

            return monthSalaries;
        }

    }
}
