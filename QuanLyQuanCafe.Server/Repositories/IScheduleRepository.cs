using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IScheduleRepository : ICoffeeManagementRepository<Schedule>
    {
        Task<Schedule?> UpdateEndDateAsync(int scheduleId, DateOnly newEndDate);
        Task<List<Schedule>> GetSchedulesForMonthAsync(int year, int month);
        Task<List<Schedule>> GetStaffWeeklySchedulesAsync(int staffId, DateOnly startDate);

    }
}
