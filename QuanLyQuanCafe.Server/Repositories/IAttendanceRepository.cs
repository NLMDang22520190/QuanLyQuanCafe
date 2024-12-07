using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IAttendanceRepository : ICoffeeManagementRepository<Attendance>
    {
        Task<Attendance?> CheckInAsync(int scheduleId, DateTime checkinTime); 
        Task<Attendance?> CheckOutAsync(int scheduleId, DateTime checkoutTime); 
        Task<List<Attendance>> GetAttendanceByDateAsync(DateOnly date);
        Task<List<Attendance>> CreateAttendancesForRangeAsync(int scheduleId, DateOnly startDate, DateOnly endDate);
        Task DeleteAttendancesForRangeAsync(int scheduleId, DateOnly startDate, DateOnly endDate);
        Task<Attendance?> GetAttendanceByScheduleIdAndDateAsync(int scheduleId, DateOnly date);

    }
}
