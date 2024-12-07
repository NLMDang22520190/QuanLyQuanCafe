using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface ISalaryRepository : ICoffeeManagementRepository<Salary>
    {
        Task<List<Salary>> GetAllSalariesByStaffIdAsync(int staffId);
        Task<Salary?> GetCurrentSalaryByStaffIdAsync(int staffId);
    }
}
