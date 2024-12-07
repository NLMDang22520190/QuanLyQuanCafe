using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/attendances")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceRepository _attendanceRepos;
        private readonly IMonthSalaryRepository _monthSalaryRepos;
        private readonly ISalaryRepository _salaryRepos;
        private readonly IScheduleRepository _scheduleRepos;

        public AttendanceController(IAttendanceRepository attendanceRepos, 
            IMonthSalaryRepository monthSalaryRepository, 
            ISalaryRepository salaryRepository,
            IScheduleRepository scheduleRepository)
        {
            _attendanceRepos = attendanceRepos;
            _monthSalaryRepos= monthSalaryRepository;
            _salaryRepos = salaryRepository;
            _scheduleRepos= scheduleRepository;
        }

        /// <summary>
        /// Check-In API
        /// </summary>
        [HttpPut("checkin")]
        public async Task<IActionResult> CheckInAsync([FromQuery] int scheduleId, [FromQuery] DateTime checkinTime)
        {
            var attendance = await _attendanceRepos.CheckInAsync(scheduleId, checkinTime);
            if (attendance == null)
            {
                return BadRequest(new { message = "Unable to check-in. Attendance not found or invalid data." });
            }

            return Ok(attendance);
        }
        /// <summary>
        /// Check-Out API
        /// </summary>
        [HttpPut("checkout")]
        public async Task<IActionResult> CheckOutAsync([FromQuery] int scheduleId, [FromQuery] DateTime checkinTime, [FromQuery] DateTime checkoutTime)
        {
            try
            {
                var schedule = await _scheduleRepos.GetByIdAsync(s=>s.ScheduleId== scheduleId);
                if (schedule == null)
                {
                    return NotFound(new { message = "Schedule not found for the given scheduleId." });
                }

                var staffId = schedule.StaffId;

                var salary = await _salaryRepos.GetCurrentSalaryByStaffIdAsync(staffId);
                if (salary == null)
                {
                    return NotFound(new { message = "Salary record not found for the given staff." });
                }

                var salaryId = salary.SalaryId;

                await _monthSalaryRepos.UpdateWorkingHoursAsync(salaryId, checkinTime, checkoutTime);

                var attendance = await _attendanceRepos.CheckOutAsync(scheduleId, checkoutTime);
                if (attendance == null)
                {
                    return BadRequest(new { message = "Could not process the checkout." });
                }

                return Ok(attendance);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred.", details = ex.Message });
            }
        }
        /// <summary>
        /// Get Attendance By Date: report for admin
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAttendanceByDateAsync([FromQuery] DateTime date)
        {
            var attendances = await _attendanceRepos.GetAttendanceByDateAsync(DateOnly.FromDateTime(date));
            if (attendances == null || attendances.Count == 0)
            {
                return NotFound(new { message = "No attendances found for the specified date." });
            }

            return Ok(attendances);
        }

        /// <summary>
        /// Get current schedule for staff
        /// </summary>
        [HttpGet("current-attendance")]
        public async Task<IActionResult> GetAttendanceByScheduleIdAndDateAsync(
            [FromQuery] int scheduleId,
            [FromQuery] DateTime date)
        {
            var attendance = await _attendanceRepos.GetAttendanceByScheduleIdAndDateAsync(scheduleId, DateOnly.FromDateTime(date));
            if (attendance == null)
            {
                return NotFound(new { message = "Attendance not found for the specified schedule ID and date." });
            }

            return Ok(attendance);
        }
    }
}
