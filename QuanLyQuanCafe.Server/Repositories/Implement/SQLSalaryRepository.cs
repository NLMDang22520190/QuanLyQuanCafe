using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLSalaryRepository : CoffeeManagementRepository<Salary>, ISalaryRepository
    {
        public SQLSalaryRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Salary>> GetAllSalariesByStaffIdAsync(int staffId)
        {
            return await dbContext.Salaries
                                  .Where(s => s.StaffId == staffId)
                                  .ToListAsync();
        }
        public async Task<Salary?> GetCurrentSalaryByStaffIdAsync(int staffId)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            return await dbContext.Salaries
                                  .Where(s => s.StaffId == staffId && s.StartDate <= today)
                                  .OrderByDescending(s => s.StartDate)
                                  .FirstOrDefaultAsync();
        }


    }
}
