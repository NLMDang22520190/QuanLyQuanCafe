using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/month-salary")]
    [ApiController]
    public class MonthSalaryController : ControllerBase
    {
        private IMonthSalaryRepository _monthSalaryRepos;
        private IStaffRepository _staffRepos;

        public MonthSalaryController(IMonthSalaryRepository monthSalaryRepository, IStaffRepository staffRepository) {
            _monthSalaryRepos=monthSalaryRepository;
            _staffRepos=staffRepository;
        }
        /// <summary>
        /// Get all month salaries for a given staff member by staffId
        /// </summary>
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetAllMonthSalaries(string userId, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 3)
        {
            if (string.IsNullOrWhiteSpace(userId))
            {
                return BadRequest(new { message = "User ID must be provided." });
            }

            var staff = await _staffRepos.GetStaffByUserid(userId);
            if (staff == null)
            {
                return NotFound(new { message = "Staff not found for the given user ID." });
            }

            var staffId = staff.StaffId;

            if (pageIndex <= 0 || pageSize <= 0)
            {
                return BadRequest(new { message = "Page index and page size must be greater than zero." });
            }

            try
            {
                var pagedResult = await _monthSalaryRepos.GetAllMonthSalariesByStaffIdAsync(staffId, pageIndex, pageSize);

                if (pagedResult.TotalRecords == 0)
                {
                    return NotFound(new { message = "No monthly salaries found for the given staff ID." });
                }

                return Ok(new
                {
                    pagedResult.CurrentPage,
                    pagedResult.PageSize,
                    pagedResult.TotalRecords,
                    pagedResult.TotalPages,
                    pagedResult.Data
                });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new
                {
                    message = "An error occurred while processing your request.",
                    details = ex.Message
                });
            }
        }


        [HttpGet("statistics")]
        public async Task<IActionResult> GetMonthSalaryStatistics()
        {
            try
            {
                var monthSalaryStatistics = await _monthSalaryRepos.GetTotalMonthSalariesByMonthsAsync();

                if (monthSalaryStatistics == null || monthSalaryStatistics.Count == 0)
                {
                    return NotFound(new { message = "No month salary statistics found." });
                }

                return Ok(monthSalaryStatistics);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", details = ex.Message });
            }
        }
    }
}
