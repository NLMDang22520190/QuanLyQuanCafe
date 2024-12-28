using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IStaffRepository : ICoffeeManagementRepository<Staff>
    {
        Task<List<Staff>> GetStaffNotInShiftAsync(int shiftId, DateOnly startDate, DateOnly endDate);
        Task<List<Staff>> GetNewestStaffAsync(int count);
        Task<PagedResult<StaffDto>> GetAllCurrentStaffAsync(int pageIndex, int pageSize);
        Task<PagedResult<StaffDto>> GetFormerStaffAsync(int pageIndex, int pageSize);
    }
}
