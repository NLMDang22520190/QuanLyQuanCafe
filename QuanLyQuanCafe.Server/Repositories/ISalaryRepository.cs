using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface ISalaryRepository : ICoffeeManagementRepository<Salary>
    {
        Task<PagedResult<SalaryDto>> GetAllSalariesByStaffIdAsync(int staffId, int pageIndex = 1, int pageSize = 10);
        Task<Salary?> GetCurrentSalaryByStaffIdAsync(int staffId);
        Task<PagedResult<SalaryDto>> GetAllSalariesByUserIdAsync(string userId, int pageIndex = 1, int pageSize = 10);
    }
}
