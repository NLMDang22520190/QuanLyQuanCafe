using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IShiftRepository : ICoffeeManagementRepository<Shift>
    {
        IQueryable<ShiftTimeDistribution> GetShiftDistribution();
        Task<PagedResult<ShiftDTO>> GetAllShift(int pageIndex, int pageSize);
        Task<ShiftDTO> CreateShift(ShiftDTO shiftDto);
        Task<ShiftDTO> UpdateShift(int shiftId, ShiftDTO shiftDto);
        Task<bool> SoftDeleteShift(int shiftId);
    }
}
