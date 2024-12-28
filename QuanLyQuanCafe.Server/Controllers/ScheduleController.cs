using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Repositories;
using QuanLyQuanCafe.Server.Models;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models.DTO;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/schedules")]
    [ApiController]
    public class ScheduleController : ControllerBase
    {
        private readonly IScheduleRepository _scheduleRepos;
        private readonly IAttendanceRepository _attendanceRepos;

        public ScheduleController(IScheduleRepository scheduleRepository, IAttendanceRepository attendanceRepository)
        {
            _scheduleRepos = scheduleRepository;
            _attendanceRepos = attendanceRepository;
        }
        /// <summary>
        /// Create schedule with full field.
        /// </summary>
        [HttpPost("create-schedule")]
        public async Task<IActionResult> CreateSchedule([FromBody] ScheduleDto scheduleDto)
        {
            try
            {
                var newScheduleDto = await _scheduleRepos.CreateScheduleAsync(scheduleDto);

                if (newScheduleDto == null)
                {
                    return BadRequest(new { message = "Failed to create schedule." });
                }

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
        [HttpPut("update-end-date/{scheduleId}")]
        public async Task<IActionResult> UpdateEndDateAsync(int scheduleId, [FromBody] DateOnly newEndDate)
        {

            var schedule = await _scheduleRepos.GetByIdAsync(s => s.ScheduleId == scheduleId);

            if (schedule == null)
            {
                return null;
            }
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
                await _attendanceRepos.DeleteAttendancesForRangeAsync(scheduleId, newEndDate, schedule.EndDate);
            }
            else if (newEndDate > schedule.EndDate)
            {
                await _attendanceRepos.CreateAttendancesForRangeAsync(scheduleId, schedule.EndDate, newEndDate);
            }


            var result = await _scheduleRepos.UpdateEndDateAsync(scheduleId, newEndDate);

            return Ok(schedule);
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
