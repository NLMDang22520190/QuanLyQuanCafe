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

        public MonthSalaryController(IMonthSalaryRepository monthSalaryRepository) {
            _monthSalaryRepos=monthSalaryRepository;
        }
        /// <summary>
        /// Get all month salaries for a given staff member by staffId
        /// </summary>
        [HttpGet("{staffId}")]
    public async Task<IActionResult> GetAllMonthSalaries(int staffId, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 3)
    {
        try
        {
            if (pageIndex <= 0 || pageSize <= 0)
            {
                return BadRequest(new { message = "Page index and page size must be greater than zero." });
            }

            var monthSalaries = await _monthSalaryRepos.GetAllMonthSalariesByStaffIdAsync(staffId);

            if (monthSalaries == null || monthSalaries.Count == 0)
            {
                return NotFound(new { message = "No month salary entries found for the given staff ID." });
            }

            var totalRecords = monthSalaries.Count;
            var pagedSalaries = monthSalaries
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var result = new
            {
                pageIndex,
                pageSize,
                totalRecords,
                totalPages = (int)Math.Ceiling((double)totalRecords / pageSize),
                data = pagedSalaries
            };

            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "An error occurred while processing your request.", details = ex.Message });
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
