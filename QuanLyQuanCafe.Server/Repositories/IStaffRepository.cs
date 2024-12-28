using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IStaffRepository : ICoffeeManagementRepository<Staff>
    {
        Task<List<StaffDto>> GetStaffNotInShiftAsync(int shiftId, int month, int year);
        Task<List<Staff>> GetNewestStaffAsync(int count);
        Task<PagedResult<StaffDto>> GetAllCurrentStaffAsync(int pageIndex, int pageSize);
        Task<PagedResult<StaffDto>> GetFormerStaffAsync(int pageIndex, int pageSize);
        Task<PagedResult<StaffDto>> GetStaffInShiftAsync(int shiftId, int month, int year, int pageIndex, int pageSize);
        Task<Staff> GetStaffByUserid(string userId);
    }
}
