using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        private IShiftRepository _shiftRepo;

        public ShiftController(IShiftRepository repo)
        {
            _shiftRepo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllShifts()
        {
            try
            {
                return Ok(await _shiftRepo.GetAllAsync());
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
