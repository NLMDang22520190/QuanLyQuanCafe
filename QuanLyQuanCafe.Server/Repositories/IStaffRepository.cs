using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IStaffRepository : ICoffeeManagementRepository<Staff>
    {
        Task<List<Staff>> GetStaffNotInShiftAsync(int shiftId, DateOnly startDate, DateOnly endDate);
        Task<List<Staff>> GetNewestStaffAsync(int count);
    }
}
