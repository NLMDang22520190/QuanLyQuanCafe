using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IScheduleRepository : ICoffeeManagementRepository<Schedule>
    {
        Task<ScheduleDto?> UpdateEndDateAsync(int scheduleId, DateOnly newEndDate);
        Task<List<Schedule>> GetSchedulesForMonthAsync(int year, int month);
        Task<List<Schedule>> GetStaffWeeklySchedulesAsync(int staffId, DateOnly startDate);
        Task<ScheduleDto?> CreateScheduleAsync(ScheduleDto scheduleDto);
    }
}
