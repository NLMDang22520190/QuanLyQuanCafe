using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/ingredient")]
    [ApiController]
    public class IngredientController : ControllerBase
    {
        private readonly IIngredientRepository _ingrerepo;

        public IngredientController(IIngredientRepository ingrerepo)
        {
            _ingrerepo = ingrerepo;
        }

        
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var ingredients = await _ingrerepo.GetAllAsync();
            return Ok(ingredients);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetIngredientById(int id)
        {
            try
            {
                var ingredient = await _ingrerepo.GetByIdAsync(f => f.IngredientId == id);
                if (ingredient == null)
                {
                    return NotFound($"Ingredient with ID {id} not found.");
                }

                return Ok(ingredient);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching the ingredient." });
            }
        }

       
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Ingredient newIngredient)
        {
            if (newIngredient == null)
            {
                return BadRequest("Invalid ingredient data.");
            }

            var createdIngredient = await _ingrerepo.CreateAsync(newIngredient);
            return CreatedAtAction(nameof(GetAll), new { id = createdIngredient.IngredientId }, createdIngredient);
        }

     
        [HttpPut("{id}/increase")]
        public async Task<IActionResult> IncreaseQuantity(int id, [FromBody] int quantity)
        {
            if (quantity <= 0)
            {
                return BadRequest("Quantity to increase must be greater than zero.");
            }

            var updatedIngredient = await _ingrerepo.UpdateAsync(
                x => x.IngredientId == id,
                ingredient => ingredient.QuantityInStock += quantity
            );

            if (updatedIngredient == null)
            {
                return NotFound("Ingredient not found.");
            }

            return Ok(updatedIngredient);
        }


        [HttpGet("check-exists")]
        public async Task<IActionResult> CheckExists(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return BadRequest(new { error = "Tên nguyên liệu không được để trống." });
            }

            var exists = await _ingrerepo.ExistsAsync(x => x.IngredientName == name);

            return Ok(new { exists });
        }

        
        [HttpPut("{id}/decrease")]
        public async Task<IActionResult> DecreaseQuantity(int id, [FromBody] int quantity)
        {
            if (quantity <= 0)
            {
                return BadRequest("Quantity to decrease must be greater than zero.");
            }

            var updatedIngredient = await _ingrerepo.UpdateAsync(
                x => x.IngredientId == id,
                ingredient =>
                {
                    if (ingredient.QuantityInStock < quantity)
                    {
                        throw new InvalidOperationException("Insufficient quantity to decrease.");
                    }
                    ingredient.QuantityInStock -= quantity;
                }
            );

            if (updatedIngredient == null)
            {
                return NotFound("Ingredient not found.");
            }

            return Ok(updatedIngredient);
        }
    }
}
