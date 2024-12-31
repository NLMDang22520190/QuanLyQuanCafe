using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Migrations;
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

        public async Task<Staff> GetStaffByUserid(string userId)
        {
            var staff = await dbContext.Staffs.FirstOrDefaultAsync(s => s.UserId == userId && s.DateEndWorking == null);
            if(staff == null)
                throw new Exception("Staff not found for the given userId.");
            else return staff;
        }
        public async Task<List<StaffDto>> GetStaffNotInShiftAsync(int shiftId, int month, int year)
        {
            var startDate = new DateOnly(year, month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            var staffInShift = await dbContext.Schedules
                .Where(s => s.ShiftId == shiftId &&
                            s.StartDate <= endDate &&
                            s.EndDate >= startDate)
                .Select(s => s.StaffId)
                .ToListAsync();

            var staffNotInShift = await dbContext.Staffs
                .Include(s => s.User)
                .Where(staff => !staffInShift.Contains(staff.StaffId))
                .ToListAsync();
            var staffDtos = staffNotInShift.Select(s => new StaffDto
            {
                StaffId = s.StaffId,
                Name = s.User?.UserName ?? "Unknown",
                Email = s.User?.Email ?? "No email",
                UserId = s.User?.Id ?? "",
                DateStartedWorking = s.DateStartedWorking
            }).ToList();
            return staffDtos;
        }
        public async Task<PagedResult<StaffDto>> GetStaffInShiftAsync(int shiftId, int month, int year, int pageIndex, int pageSize)
        {
            var startDate = new DateOnly(year, month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);

            var staffInShift = await dbContext.Schedules
                .Where(s => s.ShiftId == shiftId &&
                            s.StartDate <= endDate &&
                            s.EndDate >= startDate)
                .Select(s => s.StaffId)
                .ToListAsync();

            var query = dbContext.Staffs
                .Include(s => s.User)
                .Where(staff => staffInShift.Contains(staff.StaffId));

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


        public async Task<List<StaffDto>> GetNewestStaffAsync(int count)
        {
            var newestStaffs = await dbContext.Staffs
                .Include(s => s.User)
                .OrderByDescending(s => s.DateStartedWorking)
                .Take(count)
                .Select(s => new StaffDto
                {
                    StaffId = s.StaffId,
                    Name = s.User.FullName ?? "Unknown",
                    Email = s.User.Email ?? "No email",
                    UserId = s.User.Id ?? "",
                    DateStartedWorking = s.DateStartedWorking
                })
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
