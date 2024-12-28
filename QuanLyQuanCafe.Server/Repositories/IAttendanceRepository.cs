using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IAttendanceRepository : ICoffeeManagementRepository<Attendance>
    {
        Task<AttendanceDto?> CheckInAsync(string userId, int shiftId, DateTime checkinTime);
        Task<AttendanceDto?> CheckOutAsync(string userId, int shiftId, DateTime checkinTime, DateTime checkoutTime);
        Task<PagedResult<StaffAttendanceDto>> GetStaffAttendanceForShiftOnDateAsync(
            int shiftId, DateOnly date, int pageIndex, int pageSize);
        Task<List<Attendance>> CreateAttendancesForRangeAsync(int scheduleId, DateOnly startDate, DateOnly endDate);
        Task DeleteAttendancesForRangeAsync(int scheduleId, DateOnly startDate, DateOnly endDate);
        Task<AttendanceDto?> GetAttendanceByUserIdShiftIdDate(string userId, int shiftId, DateOnly date);

    }
}
