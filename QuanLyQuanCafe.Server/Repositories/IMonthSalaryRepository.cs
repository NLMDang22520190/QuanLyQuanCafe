using QuanLyQuanCafe.Server.Models.Domain;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IMonthSalaryRepository:ICoffeeManagementRepository<MonthSalary>
    {
        Task UpdateWorkingHoursAsync(int staffId, DateTime checkinTime, DateTime checkoutTime);
        Task<List<MonthSalary>> GetAllMonthSalariesByStaffIdAsync(int staffId);
        Task<List<MonthSalaryStatisticDTO>> GetTotalMonthSalariesByMonthsAsync();
        Task<List<MonthSalary>> CreateForRangeAsync(int salaryId, DateOnly startDate, DateOnly endDate);
        Task DeleteFutureMonthSalariesAsync(int salaryId, DateOnly startDate);
    }
}
