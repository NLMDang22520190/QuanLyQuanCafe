using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.RequestModels;
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
        private readonly IStaffRepository _staffRepos;

        public AttendanceController(IAttendanceRepository attendanceRepos, 
            IMonthSalaryRepository monthSalaryRepository, 
            ISalaryRepository salaryRepository,
            IScheduleRepository scheduleRepository,
            IStaffRepository staffRepos)
        {
            _attendanceRepos = attendanceRepos;
            _monthSalaryRepos= monthSalaryRepository;
            _salaryRepos = salaryRepository;
            _scheduleRepos= scheduleRepository;
            _staffRepos= staffRepos;
        }

        /// <summary>
        /// Check-In API
        /// </summary>
        [HttpPost("checkin")]
        public async Task<IActionResult> CheckInAsync([FromBody] CheckinRequest request)
        {
            if (request == null)
            {
                return BadRequest("Request cannot be null.");
            }

            try
            {
                var attendance = await _attendanceRepos.CheckInAsync(request.UserId, request.ShiftId, request.Checkin);
                if (attendance == null)
                {
                    return NotFound("Attendance record not found.");
                }

                return Ok(attendance);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// Check-Out API
        /// </summary>
        [HttpPut("checkout")]
        public async Task<IActionResult> CheckOutAsync([FromQuery] CheckoutRequest checkoutRequest)
        {
            try
            {
                var staff = await _staffRepos.GetStaffByUserid(checkoutRequest.UserId);
                var staffId = staff.StaffId;

                var salary = await _salaryRepos.GetCurrentSalaryByStaffIdAsync(staffId);
                if (salary == null)
                {
                    return NotFound(new { message = "Salary record not found for the given staff." });
                }

                var salaryId = salary.SalaryId;

                await _monthSalaryRepos.UpdateWorkingHoursAsync(salaryId, checkoutRequest.Checkin, checkoutRequest.Checkout);

                var attendance = await _attendanceRepos.CheckOutAsync(checkoutRequest.UserId, checkoutRequest.ShiftId, checkoutRequest.Checkin, checkoutRequest.Checkout);
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
        [HttpGet("shift/{shiftId}/date/{date}")]
        public async Task<IActionResult> GetStaffAttendanceForShiftOnDateAsync(
            int shiftId,
            [FromRoute] DateOnly date,
            [FromQuery] int pageIndex = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                // Log các tham số đầu vào
                Console.WriteLine($"ShiftId: {shiftId}, Date: {date}, PageIndex: {pageIndex}, PageSize: {pageSize}");

                var pagedResult = await _attendanceRepos.GetStaffAttendanceForShiftOnDateAsync(
                    shiftId, date, pageIndex, pageSize);

                if (pagedResult.Data == null || !pagedResult.Data.Any())
                {
                    return NotFound(new { message = "No attendances found for the specified shift and date." });
                }

                return Ok(pagedResult);
            }
            catch (Exception ex)
            {
                // Log lỗi chi tiết
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal Server Error", error = ex.Message });
            }
        }


        /// <summary>
        /// Get current schedule for staff
        /// </summary>
        [HttpGet("current-attendance")]
        public async Task<IActionResult> GetAttendanceByScheduleIdAndDateAsync(
            [FromQuery] string userId,
            [FromQuery] int shiftId,
            [FromQuery] DateOnly date)
        {
            var attendance = await _attendanceRepos.GetAttendanceByUserIdShiftIdDate(userId,shiftId, date);
            if (attendance == null)
            {
                return NotFound(new { message = "Attendance not found for the specified user ID and shift id and date." });
            }

            return Ok(attendance);
        }
        [HttpGet("rollcall-report")]
        public async Task<IActionResult> GetAttendancesByUserIdAndMonth(
         [FromQuery] string userId,
         [FromQuery] int month,
         [FromQuery] int year,
         [FromQuery] int pageIndex = 1,
         [FromQuery] int pageSize = 10)
        {
            try
            {
                // Validate inputs
                if (string.IsNullOrWhiteSpace(userId))
                {
                    return BadRequest(new { message = "User ID must be provided." });
                }

                if (month < 1 || month > 12)
                {
                    return BadRequest(new { message = "Month must be between 1 and 12." });
                }

                if (year < 1)
                {
                    return BadRequest(new { message = "Year must be greater than 0." });
                }

                if (pageIndex <= 0 || pageSize <= 0)
                {
                    return BadRequest(new { message = "Page index and page size must be greater than zero." });
                }

                var result = await _attendanceRepos.GetAttendancesByUserIdAndMonthAsync(userId, month, year, pageIndex, pageSize);

                if (result.TotalRecords == 0)
                {
                    return NotFound(new { message = "No attendance records found for the given user and month." });
                }

                return Ok(new
                {
                    result.CurrentPage,
                    result.PageSize,
                    result.TotalRecords,
                    result.TotalPages,
                    result.Data
                });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                // Handle unexpected errors
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", details = ex.Message });
            }
        }


    }
}
