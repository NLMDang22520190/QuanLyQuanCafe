using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/shifts")]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        private readonly IShiftRepository _shiftRepo;
        private readonly IStaffRepository _staffRepo;

        public ShiftController(IShiftRepository shiftRepo, IStaffRepository staffRepo)
        {
            _shiftRepo = shiftRepo;
            _staffRepo = staffRepo;
        }
        /// <summary>
        /// Get all shifts
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllShifts(int pageIndex, int pageSize)
        {
            var pagedResult = await _shiftRepo.GetAllShift(pageIndex, pageSize);

            if (pagedResult == null || !pagedResult.Data.Any())
            {
                return NotFound(new { message = "No shift found." });
            }

            return Ok(new
            {
                message = "Shift fetched successfully.",
                data = pagedResult.Data,
                totalRecords = pagedResult.TotalRecords,
                totalPages = pagedResult.TotalPages,
                currentPage = pagedResult.CurrentPage,
                pageSize = pagedResult.PageSize
            });
        }
        /// <summary>
        /// Get shifts by staff ID
        /// </summary>
        [HttpGet("staff/{userId}")]
        public async Task<IActionResult> GetShiftsByStaffId(string userId)
        {
            try
            {
                var staff = await _staffRepo.GetStaffByUserid(userId);
                if (staff == null)
                {
                    return NotFound(new { error = "Staff not found." });
                }

                var staffId = staff.StaffId;
                var shifts = await _shiftRepo.GetShiftsByStaffId(staffId);

                if (shifts == null || shifts.Count == 0)
                {
                    return NotFound(new { message = $"No shifts found for staff with ID {staffId}." });
                }

                return Ok(new
                {
                    message = "Shifts fetched successfully.",
                    data = shifts
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"An error occurred while fetching shifts: {ex.Message}" });
            }
        }
        /// <summary>
        /// Get a shift by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetShiftById(int id)
        {
            try
            {
                var shift = await _shiftRepo.GetByIdAsync(s => s.ShiftId == id);
                if (shift == null)
                {
                    return NotFound($"Shift with ID {id} not found.");
                }
                return Ok(shift);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching the shift." });
            }
        }
        /// <summary>
        /// Create a new shift
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> CreateShift([FromBody] ShiftDTO newShift)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = "Invalid data provided." });
            }

            try
            {
                var createdShift = await _shiftRepo.CreateShift(newShift);
                return CreatedAtAction(nameof(GetShiftById), new { id = createdShift.ShiftId }, createdShift);
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating the shift." });
            }
        }
        /// <summary>
        /// Update a shift
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShift(int id, [FromBody] ShiftDTO shiftDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { error = "Invalid data provided." });
            }

            try
            {
                var updatedShift = await _shiftRepo.UpdateShift(id, shiftDto);
                return Ok(updatedShift);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (InvalidOperationException ex)
            {
                return Conflict(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}, {ex.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while updating the shift." });
            }
        }
        /// <summary>
        /// Delete shift
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> SoftDeleteShift(int id)
        {
            try
            {
                var result = await _shiftRepo.SoftDeleteShift(id);
                return Ok(new { success = result });
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}, {ex.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while deleting the shift." });
            }
        }


        [HttpGet("statistics")]
        public async Task<IActionResult> GetShiftStatistics()
        {
            try
            {
                var shiftDistribution = _shiftRepo.GetShiftDistribution();
                if (shiftDistribution == null || !shiftDistribution.Any())
                {
                    return NotFound("No shift distribution found.");
                }
                return Ok(shiftDistribution);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching shift distribution." });
            }
        }
    }
}
