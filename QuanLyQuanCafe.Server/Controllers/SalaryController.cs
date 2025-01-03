﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;
using System.ComponentModel.DataAnnotations;

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
        public async Task<IActionResult> CreateSalary([FromBody] SalaryDto salaryDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Chuyển đổi DTO sang entity
                var newSalary = new Salary
                {
                    StaffId = salaryDto.StaffId,
                    HourWage = salaryDto.HourWage,
                    StartDate = DateOnly.Parse(salaryDto.StartDate) // Chuyển string sang DateOnly
                };

                var createdSalary = await _salaryRepo.CreateAsync(newSalary);

                Console.WriteLine($"Create salary data: SalaryID={newSalary.SalaryId}");
                return CreatedAtAction(nameof(CreateSalary), new { id = createdSalary.SalaryId }, createdSalary);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}, {ex.StackTrace}");
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
        /// Get all salaries for a specific staff member.
        /// </summary>
        [HttpGet("{staffId}")]
        public async Task<IActionResult> GetAllSalariesByStaffID(int staffId, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 3)
        {
            try
            {
                if (pageIndex <= 0 || pageSize <= 0)
                {
                    return BadRequest(new { message = "Page index and page size must be greater than zero." });
                }

                var pagedResult = await _salaryRepo.GetAllSalariesByStaffIdAsync(staffId, pageIndex, pageSize);

                if (pagedResult.TotalRecords == 0)
                {
                    return NotFound(new { message = "No salaries found for the given staff ID." });
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


    }

    public class SalaryDto
    {
        [Required]
        public int StaffId { get; set; }

        [Required]
        public int HourWage { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public string StartDate { get; set; } // Chấp nhận kiểu string để nhận dữ liệu dạng "YYYY-MM-DD"
    }

}
