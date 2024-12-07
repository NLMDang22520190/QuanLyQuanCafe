using QuanLyQuanCafe.Server.Models.Domain;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IMonthSalaryRepository:ICoffeeManagementRepository<MonthSalary>
    {
        Task UpdateWorkingHoursAsync(int staffId, DateTime checkinTime, DateTime checkoutTime);
        Task<List<MonthSalary>> GetAllMonthSalariesByStaffIdAsync(int staffId);
    }
}
