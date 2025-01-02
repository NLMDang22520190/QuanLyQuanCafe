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
        private readonly IIngredientRepository _ingredientRepo;

        public ImportRecordController(IImportRecordRepository importRecordRepo, IIngredientRepository ingredientRepo)
        {
            _importRecordRepo = importRecordRepo;
            _ingredientRepo = ingredientRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var records = await _importRecordRepo.GetAllAsync();
            return Ok(records);
        }
    
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ImportMaterialDto importMaterialDto)
        {
            if (importMaterialDto?.NewRecord == null)
            {
                return BadRequest("Invalid record data.");
            }

            try
            {
                var newRecord = importMaterialDto.NewRecord;
                var ingredient = await _ingredientRepo.GetByIdAsync(
                    x => x.IngredientName == importMaterialDto.IngredientName
                );

                if (ingredient == null)
                {
                  
                    var newIngredient = new Ingredient
                    {
                        IngredientName = importMaterialDto.IngredientName ?? "Unknown Name",
                        Unit = importMaterialDto.Unit ?? "Unknown Unit",
                        QuantityInStock = newRecord.QuantityImport,
                        ImporterId = 1, 
                        ImportPrice = newRecord.ImportPrice
                    };

                  
                    var createdIngredient = await _ingredientRepo.CreateAsync(newIngredient);
                    newRecord.IngredientId = createdIngredient.IngredientId; 
                }
                else
                {
                  
                    await _ingredientRepo.UpdateAsync(
                        x => x.IngredientId == ingredient.IngredientId,
                        ing => ing.QuantityInStock += newRecord.QuantityImport
                    );

                    newRecord.IngredientId = ingredient.IngredientId;
                }

             
                var createdRecord = await _importRecordRepo.CreateAsync(newRecord);

                return CreatedAtAction(nameof(GetAll), new { id = createdRecord.ImportRecordId }, createdRecord);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}, {ex.InnerException?.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = ex.InnerException?.Message ?? ex.Message });
            }
        }
    }


    public class ImportMaterialDto
    {
        public ImportRecord NewRecord { get; set; }
        public string IngredientName { get; set; } 
        public string Unit { get; set; } 
    }
}
