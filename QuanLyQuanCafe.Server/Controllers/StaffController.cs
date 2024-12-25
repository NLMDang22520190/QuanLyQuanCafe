using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using QuanLyQuanCafe.Server.Models;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Helpers;
using QuanLyQuanCafe.Server.Migrations;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;
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

            
            var existingStaff = await _context.Staffs.FirstOrDefaultAsync(s => s.UserId == userId);
            if (existingStaff != null)
            {
                return Conflict("User is already a staff member.");
            }

            
            var currentRole = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            if (currentRole != null && currentRole != AppRole.Staff)
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

            return CreatedAtAction(nameof(GetStaffById), new { id = staff.StaffId }, staff);
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

            var staff = await _context.Staffs.FirstOrDefaultAsync(s => s.UserId == userId);
            if (staff == null)
            {
                return NotFound("Staff not found.");
            }

            staff.DateEndWorking = DateTime.UtcNow;

        
            var currentRole = (await _userManager.GetRolesAsync(user)).FirstOrDefault();
            if (currentRole != null && currentRole != "Customer")
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
        [HttpGet("staffs")]
        public async Task<IActionResult> GetAllStaff(int id)
        {
            var staffs = await _staffRepo.GetAllAsync();
            
            return Ok(staffs);
        }

    }
}
