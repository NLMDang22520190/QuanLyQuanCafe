using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using QuanLyQuanCafe.Server.Models;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Helpers;
using QuanLyQuanCafe.Server.Migrations;
using QuanLyQuanCafe.Server.Repositories;
using QuanLyQuanCafe.Server.Models.DTOs;
namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/staff")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly CoffeeManagementContext _context;
        private readonly IStaffRepository _staffRepo;
        private readonly ISalaryRepository _salaryRepo;


        private readonly UserManager<ApplicationUser> _userManager;
        

        public StaffController(CoffeeManagementContext context, UserManager<ApplicationUser> userManager, IStaffRepository staffRepository, ISalaryRepository salaryRepository)
        {
            _context = context;
            _staffRepo = staffRepository;
            _salaryRepo = salaryRepository;
            _userManager = userManager;
        }

        // Create staff - Change user role to staff, create staff record, and create salary
        [HttpPost("create")]
        public async Task<IActionResult> CreateStaffAsync(string userId, int hourWage)
        {
            
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            if (currentRoles.Contains(AppRole.Staff))
            {
                return BadRequest("User is already a staff member.");
            }

            var currentRole = currentRoles.FirstOrDefault();
            if (currentRole != null && currentRole == AppRole.Customer)
            {
                await _userManager.RemoveFromRoleAsync(user, currentRole); 
                await _userManager.AddToRoleAsync(user, AppRole.Staff); 
            };


            var staff = new Staff { UserId = userId,User=user,DateStartedWorking=DateTime.UtcNow };

            await _staffRepo.CreateAsync(staff);

            var salary = new Salary
            {
                StaffId = staff.StaffId,
                HourWage = hourWage,
                StartDate = DateOnly.FromDateTime(DateTime.UtcNow),
            };

            await _salaryRepo.CreateAsync(salary);
            var staffDto = new CreateStaffDTO
            {
                StaffId = staff.StaffId,
                UserId = staff.UserId,
                DateStartedWorking = staff.DateStartedWorking
            };

            return CreatedAtAction(nameof(GetStaffById), new { id = staff.StaffId }, staffDto);
        }

        // Disable staff - Update end work date and change user role to customer
        [HttpPost("disable")]
        public async Task<IActionResult> DisableStaffAsync(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            var staff = await _context.Staffs.FirstOrDefaultAsync(s => s.UserId == userId&& s.DateEndWorking == null);
            if (staff == null)
            {
                return NotFound("Staff not found.");
            }

            var currentRoles = await _userManager.GetRolesAsync(user);
            if (!currentRoles.Contains(AppRole.Staff))
            {
                return BadRequest("User is not a staff member.");
            }

            staff.DateEndWorking = DateTime.UtcNow;

            var currentRole = currentRoles.FirstOrDefault();
            if (currentRole != null && currentRole != AppRole.Customer)
            {
                await _userManager.RemoveFromRoleAsync(user, currentRole);
                await _userManager.AddToRoleAsync(user, AppRole.Customer);
            }

            await _context.SaveChangesAsync();

            return Ok("Staff disabled successfully.");
        }
        [HttpPost("admin")]
        public async Task<IActionResult> Admin(string userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }



            await _userManager.RemoveFromRoleAsync(user, AppRole.Customer);
            await _userManager.AddToRoleAsync(user, AppRole.Admin);
            

            await _context.SaveChangesAsync();

            return Ok("Admin create successfully.");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStaffById(int id)
        {
            var staff = await _context.Staffs.Include(s => s.User).FirstOrDefaultAsync(s => s.StaffId == id);
            if (staff == null)
            {
                return NotFound("Staff not found.");
            }
            return Ok(staff);
        }

        [HttpGet("current-staffs")]
        public async Task<IActionResult> GetAllStaff(int pageIndex, int pageSize)
        {
            var pagedResult = await _staffRepo.GetAllCurrentStaffAsync(pageIndex, pageSize);

            if (pagedResult == null || !pagedResult.Data.Any())
            {
                return NotFound(new { message = "No staff found." });
            }

            return Ok(new
            {
                message = "Staff fetched successfully.",
                data = pagedResult.Data,
                totalRecords = pagedResult.TotalRecords,
                totalPages = pagedResult.TotalPages,
                currentPage = pagedResult.CurrentPage,
                pageSize = pagedResult.PageSize
            });
        }
        [HttpGet("former-staffs")]
        public async Task<IActionResult> GetFormerStaff(int pageIndex, int pageSize)
        {
            var pagedResult = await _staffRepo.GetFormerStaffAsync(pageIndex, pageSize);

            if (pagedResult == null || !pagedResult.Data.Any())
            {
                return NotFound(new { message = "No former staff found." });
            }

            return Ok(new
            {
                message = "Former staff fetched successfully.",
                data = pagedResult.Data,
                totalRecords = pagedResult.TotalRecords,
                totalPages = pagedResult.TotalPages,
                currentPage = pagedResult.CurrentPage,
                pageSize = pagedResult.PageSize
            });
        }
        [HttpGet("staff-not-in-shift/{shiftId}")]
        public async Task<IActionResult> GetStaffNotInShift(int shiftId, [FromQuery] int month, [FromQuery] int year)
        {
            try
            {
                var staffDtos = await _staffRepo.GetStaffNotInShiftAsync(shiftId, month, year);
                return Ok(staffDtos);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}, {ex.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while retrieving staff." });
            }
        }
        [HttpGet("staff-in-shift/{shiftId}")]
        public async Task<IActionResult> GetStaffInShift(int shiftId, [FromQuery] int month, [FromQuery] int year, [FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10)
        {
            try
            {
                var result = await _staffRepo.GetStaffInShiftAsync(shiftId, month, year, pageIndex, pageSize);

                if (result == null || result.Data == null || !result.Data.Any())
                {
                    return NotFound(new { message = "No staff found for this shift in the specified period." });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}, {ex.StackTrace}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while retrieving staff." });
            }
        }


        [HttpGet("newest-staffs/{count}")]
        public async Task<IActionResult> GetNewestStaffAsync(int count)
        {
            var staffs = await _staffRepo.GetNewestStaffAsync(count);
            return Ok(staffs);
        }

        [HttpGet("get-staff-id-by-user/{userId}")]
        public async Task<IActionResult> GetStaffIdByUserId(string userId)
        {
            var staff = await _context.Staffs
                .FirstOrDefaultAsync(s => s.UserId == userId && s.DateEndWorking == null); // Kiểm tra nếu staff còn làm việc

            if (staff == null)
            {
                return NotFound(new { message = "Staff not found for the given UserId." });
            }

            return Ok(new { staffId = staff.StaffId });
        }


    }
}
