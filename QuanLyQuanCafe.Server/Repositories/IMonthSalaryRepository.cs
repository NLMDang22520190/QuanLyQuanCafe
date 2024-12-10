using QuanLyQuanCafe.Server.Models.Domain;
using static QuanLyQuanCafe.Server.Repositories.Implement.SQLMonthSalaryRepository;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IMonthSalaryRepository:ICoffeeManagementRepository<MonthSalary>
    {
        Task UpdateWorkingHoursAsync(int staffId, DateTime checkinTime, DateTime checkoutTime);
        Task<List<MonthSalary>> GetAllMonthSalariesByStaffIdAsync(int staffId);
        Task<List<MonthSalarySummary>> GetTotalMonthSalariesByMonthsAsync();
    }
}
