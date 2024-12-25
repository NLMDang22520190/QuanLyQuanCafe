using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/salaries")]
    [ApiController]
    public class SalaryController : ControllerBase
    {
        private ISalaryRepository _salaryRepo;
        private readonly IStaffRepository _staffRepo;

        public SalaryController(ISalaryRepository salaryRepository, IStaffRepository staffRepository)
        {
            _salaryRepo = salaryRepository;
            _staffRepo = staffRepository;
        }
        /// <summary>
        /// Create a new salary
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateSalary([FromBody] Salary newSalary)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }

            try
            {
                var createdSalary = await _salaryRepo.CreateAsync(newSalary);
                Console.WriteLine($"create salary data: salaryID={newSalary.SalaryId}");
                return CreatedAtAction(nameof(_salaryRepo), new { id = createdSalary.SalaryId }, createdSalary);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message} , {ex.StackTrace}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating the salary." });
            }
        }
        /// <summary>
        /// Get current staff salary
        /// </summary>
        [HttpGet("{staffId}/current")]
        public async Task<IActionResult> GetCurrentSalary(int staffId)
        {
            var salary = await _salaryRepo.GetCurrentSalaryByStaffIdAsync(staffId);
            if (salary == null)
            {
                return NotFound($"No current salary found for staffId {staffId}");
            }

            return Ok(salary);
        }

        /// <summary>
        /// Get all salary of staff
        /// </summary>
        [HttpGet("{staffId}")]
        public async Task<IActionResult> GetAllSalariesByStaffID(int staffId)
        {
            var salaries = await _salaryRepo.GetAllSalariesByStaffIdAsync(staffId);

            if (salaries == null || !salaries.Any())
            {
                return NotFound($"No salary found for staffId {staffId}");
            }

            return Ok(salaries);
        }
    }
}
