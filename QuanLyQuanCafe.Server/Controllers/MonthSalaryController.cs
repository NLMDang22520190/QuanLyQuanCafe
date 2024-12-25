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
        public async Task<IActionResult> GetAllMonthSalaries(int staffId)
        {
            try
            {
                var monthSalaries = await _monthSalaryRepos.GetAllMonthSalariesByStaffIdAsync(staffId);

                if (monthSalaries == null || monthSalaries.Count == 0)
                {
                    return NotFound(new { message = "No month salary entries found for the given staff ID." });
                }

                return Ok(monthSalaries);
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
