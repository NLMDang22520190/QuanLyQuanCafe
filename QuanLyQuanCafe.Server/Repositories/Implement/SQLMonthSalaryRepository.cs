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

        public async Task UpdateWorkingHoursAsync(int staffId, DateTime checkinTime, DateTime checkoutTime)
        {
            var workingHours = (checkoutTime - checkinTime).TotalHours;

            var monthSalary = await _dbSet.FirstOrDefaultAsync(ms => ms.SalaryId == staffId 
                &&ms.Month == DateOnly.FromDateTime(checkoutTime).ToString("yyyy-MM"));

            if (monthSalary == null)
            {
                monthSalary = new MonthSalary
                {
                    SalaryId = staffId,
                    Month = DateOnly.FromDateTime(checkinTime).ToString("yyyy-MM"),
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
    }
}
