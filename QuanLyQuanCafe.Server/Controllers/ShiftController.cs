using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/shitfs")]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        private readonly IShiftRepository _shiftRepo;

        public ShiftController(IShiftRepository shiftRepo)
        {
            _shiftRepo = shiftRepo;
        }
        /// <summary>
        /// Get all shifts
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetAllShifts()
        {
            try
            {
                var shifts = await _shiftRepo.GetAllAsync();
                if (shifts == null || !shifts.Any())
                {
                    return NotFound("No shifts found.");
                }
                return Ok(shifts);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching shifts." });
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
        public async Task<IActionResult> CreateShift([FromBody] Shift newShift)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }

            try
            {
                var createdShift = await _shiftRepo.CreateAsync(newShift);
                Console.WriteLine($"create shift data: ShiftID={newShift.ShiftId}");
                return CreatedAtAction(nameof(GetShiftById), new { id = createdShift.ShiftId }, createdShift);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message} , {ex.StackTrace}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating the shift." });
            }
        }
        /// <summary>
        /// Update a shift
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateShift(int id, [FromBody] Shift updatedShift)
        {
            Console.WriteLine($"Received data: ShiftName={updatedShift.ShiftName}, StartTime={updatedShift.StartTime}, EndTime={updatedShift.EndTime}");
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }

            try
            {
                var updated = await _shiftRepo.UpdateAsync(
                    s => s.ShiftId == id,
                    shift =>
                    {
                        shift.StartTime = updatedShift.StartTime;
                        shift.EndTime = updatedShift.EndTime;
                    }
                );

                if (updated == null)
                {
                    return NotFound($"Shift with ID {id} not found.");
                }

                return Ok(updated);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while updating the shift." });
            }
        }
        /// <summary>
        /// Delete shift
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShift(int id)
        {
            try
            {
                var deletedShift = await _shiftRepo.DeleteAsync(s => s.ShiftId == id);
                if (deletedShift == null)
                {
                    return NotFound($"Shift with ID {id} not found.");
                }

                return Ok($"Shift with ID {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while deleting the shift." });
            }
        }
    }
}
