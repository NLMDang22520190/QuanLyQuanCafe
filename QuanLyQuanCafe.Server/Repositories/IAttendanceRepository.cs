using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IAttendanceRepository : ICoffeeManagementRepository<Attendance>
    {
        Task<Attendance?> CheckInAsync(int scheduleId, DateTime checkinTime);
        Task<Attendance?> CheckOutAsync(int attendanceId, DateTime checkoutTime);
        Task<List<Attendance>> GetAttendanceByDateAsync(DateOnly date);
        Task<List<Attendance>> CreateAttendancesForRangeAsync(int scheduleId, DateTime startDate, DateTime endDate);

    }
}
