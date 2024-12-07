using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
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

    }
}
