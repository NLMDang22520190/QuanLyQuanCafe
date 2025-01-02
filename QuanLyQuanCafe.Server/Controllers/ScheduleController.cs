using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Repositories;
using QuanLyQuanCafe.Server.Models;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Migrations;
using QuanLyQuanCafe.Server.Models.RequestModels;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/schedules")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleRepository _scheduleRepos;
        private readonly IAttendanceRepository _attendanceRepos;
        private readonly ISalaryRepository _salaryRepos;
        private readonly IMonthSalaryRepository _monthSalaryRepos;



        public ScheduleController(IScheduleRepository scheduleRepository, IAttendanceRepository attendanceRepository, ISalaryRepository salaryRepository, IMonthSalaryRepository monthSalaryRepository)
        {
            _scheduleRepos = scheduleRepository;
            _attendanceRepos = attendanceRepository;
            _salaryRepos = salaryRepository;
            _monthSalaryRepos=monthSalaryRepository;
        }
        /// <summary>
        /// Create schedule with full field.
        /// </summary>
        [HttpPost("create-schedule")]
        public async Task<IActionResult> CreateSchedule([FromBody] ScheduleDto scheduleDto)
        {
            try
            {
                var salary = await _salaryRepos.GetCurrentSalaryByStaffIdAsync(scheduleDto.StaffId);
                if (salary == null)
                {
                    return NotFound(new { message = "Salary record not found for the given staff." });
                }
                var salaryId = salary.SalaryId;
                await _monthSalaryRepos.CreateForRangeAsync(salaryId, scheduleDto.StartDate, scheduleDto.EndDate);
                var newScheduleDto = await _scheduleRepos.CreateScheduleAsync(scheduleDto);

                if (newScheduleDto == null)
                {
                    return BadRequest(new { message = "Failed to create schedule." });
                }
                await _attendanceRepos.CreateAttendancesForRangeAsync(newScheduleDto.ScheduleId, scheduleDto.StartDate, scheduleDto.EndDate);

                return Ok(newScheduleDto);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}, {ex.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating the schedule." });
            }
        }

        /// <summary>
        /// Update the end date of a specific schedule.
        /// </summary>
        [HttpPut("update-end-date")]
        public async Task<IActionResult> UpdateEndDateAsync(int staffId, int shiftId, [FromBody] DateOnly newEndDate)
        {

            var schedule = await _scheduleRepos.GetByIdAsync(s => s.StaffId == staffId && s.ShiftId==shiftId);
            if (schedule == null)
            {
                return NotFound(new { message = "schedule record not found for the given staffid and shiftId." });
            }
            var scheduleId = schedule.ScheduleId;
            var salary = await _salaryRepos.GetCurrentSalaryByStaffIdAsync(staffId);
            if (salary == null)
            {
                return NotFound(new { message = "Salary record not found for the given staff." });
            }
            var salaryId = salary.SalaryId;

            if (newEndDate <= schedule.StartDate)
            {
                return BadRequest(new { message = "The new end date must be greater than the start date." });
            }

            if (newEndDate <= DateOnly.FromDateTime(DateTime.Now))
            {
                return BadRequest(new { message = "The new end date must be greater than the current date." });
            }

            if (newEndDate < schedule.EndDate)
            {
                await _monthSalaryRepos.DeleteFutureMonthSalariesAsync(salaryId, newEndDate);
                await _attendanceRepos.DeleteAttendancesForRangeAsync(scheduleId, newEndDate, schedule.EndDate);
            }
            else if (newEndDate > schedule.EndDate)
            {
                await _monthSalaryRepos.CreateForRangeAsync(salaryId, schedule.EndDate, newEndDate); 
                await _attendanceRepos.CreateAttendancesForRangeAsync(scheduleId, schedule.EndDate, newEndDate);
            }


            var result = await _scheduleRepos.UpdateEndDateAsync(scheduleId, newEndDate);

            return Ok(new ScheduleDto
            {
                ScheduleId = result.ScheduleId,
                StaffId = result.StaffId,
                ShiftId = result.ShiftId,
                EndDate = result.EndDate,
                StartDate = result.StartDate,
            });

        }

        /// <summary>
        /// Get schedules that fall within a specified month.
        /// </summary>
        [HttpGet("for-month/{year}/{month}")]
        public async Task<IActionResult> GetSchedulesForMonthAsync(int year, int month)
        {
            var schedules = await _scheduleRepos.GetSchedulesForMonthAsync(year, month);
            return Ok(schedules);
        }

        /// <summary>
        /// Get weekly schedules of a specific staff member starting from a date.
        /// </summary>
        [HttpGet("{staffId}")]
        public async Task<IActionResult> GetStaffWeeklySchedulesAsync(int staffId, [FromQuery] DateOnly startDate)
        {
            var schedules = await _scheduleRepos.GetStaffWeeklySchedulesAsync(staffId, startDate);
            return Ok(schedules);
        }
    }


}
