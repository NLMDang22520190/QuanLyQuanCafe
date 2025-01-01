using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLSalaryRepository : CoffeeManagementRepository<Salary>, ISalaryRepository
    {
        public SQLSalaryRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }

        public async Task<PagedResult<SalaryDto>> GetAllSalariesByStaffIdAsync(int staffId, int pageIndex = 1, int pageSize = 10)
        {
            var query = dbContext.Salaries
                                  .Where(s => s.StaffId == staffId);
            var totalRecords = await query.CountAsync();

            var salaries = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var salariesDto = salaries.Select(a => new SalaryDto
            {
                SalaryId = a.SalaryId,
                StaffId = a.StaffId,
                HourWage = a.HourWage,
                StartDate = a.StartDate,
            }).ToList();

            return new PagedResult<SalaryDto>
            {
                TotalRecords = totalRecords,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize),
                Data = salariesDto
            };
        }
        public async Task<Salary?> GetCurrentSalaryByStaffIdAsync(int staffId)
        {
            var today = DateOnly.FromDateTime(DateTime.UtcNow);

            return await dbContext.Salaries
                                  .Where(s => s.StaffId == staffId && s.StartDate <= today)
                                  .OrderByDescending(s => s.StartDate)
                                  .FirstOrDefaultAsync();
        }
        public async Task<PagedResult<SalaryDto>> GetAllSalariesByUserIdAsync(string userId,  int pageIndex = 1, int pageSize = 10)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                throw new ArgumentException("User ID must be provided.");
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

            var query = dbContext.Salaries
                                  .Where(s => s.StaffId == staffId);
            var totalRecords = await query.CountAsync();

            var salaries = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var salariesDto = salaries.Select(a => new SalaryDto
            {
                SalaryId=a.SalaryId,
                StaffId=a.StaffId,
                HourWage=a.HourWage,
                StartDate=a.StartDate,
            }).ToList();

            return new PagedResult<SalaryDto>
            {
                TotalRecords = totalRecords,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize),
                Data = salariesDto
            };
        }

    }
}
