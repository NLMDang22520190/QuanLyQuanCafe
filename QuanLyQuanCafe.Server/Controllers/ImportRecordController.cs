using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/import-record")]
    [ApiController]
    public class ImportRecordController : ControllerBase
    {
        private readonly IImportRecordRepository _importRecordRepo;

        public ImportRecordController(IImportRecordRepository importRecordRepo)
        {
            _importRecordRepo = importRecordRepo;
        }

       
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var records = await _importRecordRepo.GetAllAsync();
            return Ok(records);
        }

        
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ImportRecord newRecord)
        {
            if (newRecord == null)
            {
                return BadRequest("Invalid record data.");
            }

            var createdRecord = await _importRecordRepo.CreateAsync(newRecord);
            return CreatedAtAction(nameof(GetAll), new { id = createdRecord.ImportRecordId }, createdRecord);
        }
    }
}
