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
