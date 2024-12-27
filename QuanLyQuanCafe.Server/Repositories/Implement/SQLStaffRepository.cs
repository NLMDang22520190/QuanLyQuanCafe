using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLStaffRepository : CoffeeManagementRepository<Staff>, IStaffRepository
    {
        public SQLStaffRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }

        

        public async Task<List<Staff>> GetStaffNotInShiftAsync(int shiftId, DateOnly startDate, DateOnly endDate)
        {
            var staffInShift = await dbContext.Schedules
                .Where(s => s.ShiftId == shiftId &&
                            s.StartDate <= endDate &&
                            s.EndDate >= startDate)
                .Select(s => s.StaffId)
                .ToListAsync();

            var staffNotInShift = await dbContext.Staffs
                .Where(staff => !staffInShift.Contains(staff.StaffId))
                .ToListAsync();

            return staffNotInShift;
        }

        public Task<List<Staff>> GetNewestStaffAsync(int count)
        {
            var newestStaffs = dbContext.Staffs
                .OrderByDescending(s => s.DateStartedWorking)
                .Take(count)
                .ToListAsync();

            return newestStaffs;
        }
        public async Task<PagedResult<StaffDto>> GetAllCurrentStaffAsync(int pageIndex, int pageSize)
        {
            var query = dbContext.Staffs
                   .Include(s => s.User)
                   .Where(s => s.DateEndWorking == null); 

            var totalRecords = await query.CountAsync();

            var staffs = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            if (staffs == null || !staffs.Any())
            {
                return null; 
            }

            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var staffDtos = staffs.Select(s => new StaffDto
            {
                StaffId = s.StaffId,
                Name = s.User?.UserName ?? "Unknown",
                Email = s.User?.Email ?? "No email", 
                UserId=s.User?.Id ?? "",
                DateStartedWorking = s.DateStartedWorking
            }).ToList();

            return new PagedResult<StaffDto>
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                Data = staffDtos
            };
        }
        public async Task<PagedResult<StaffDto>> GetFormerStaffAsync(int pageIndex, int pageSize)
        {
            var query = dbContext.Staffs
                .Include(s => s.User)
                .Where(s => s.DateEndWorking != null); 

            var totalRecords = await query.CountAsync();

            var staffs = await query
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            if (staffs == null || !staffs.Any())
            {
                return null;
            }

            var totalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);

            var staffDtos = staffs.Select(s => new StaffDto
            {
                StaffId = s.StaffId,
                Name = s.User?.UserName ?? "Unknown",
                Email = s.User?.Email ?? "No email",
                UserId = s.User?.Id ?? "",
                DateStartedWorking = s.DateStartedWorking,
                DateEndWorking = (DateTime)s.DateEndWorking
            }).ToList();

            return new PagedResult<StaffDto>
            {
                TotalRecords = totalRecords,
                TotalPages = totalPages,
                CurrentPage = pageIndex,
                PageSize = pageSize,
                Data = staffDtos
            };
        }

    }
}
