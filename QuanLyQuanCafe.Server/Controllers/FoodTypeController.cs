using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/food-types")]
    [ApiController]
    public class FoodTypeController(IFoodTypeRepository foodTypeRepo, IMenuItemRepository menuItemRepo, IIngredientRepository ingredientRepo) : ControllerBase
    {
        private readonly IFoodTypeRepository _foodTypeRepo = foodTypeRepo;

        private readonly IMenuItemRepository _menuItemRepo = menuItemRepo;
        private readonly IIngredientRepository _ingredientRepo = ingredientRepo;

        [HttpGet]
        public async Task<IActionResult> GetAllFoodTypes()
        {
            try
            {
                var foodTypes = await _foodTypeRepo.GetAllAsync();
                if (foodTypes == null || !foodTypes.Any())
                {
                    return NotFound("No food types found.");
                }
                return Ok(foodTypes);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching food types." });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFoodTypeById(int id)
        {
            try
            {
                var foodType = await _foodTypeRepo.GetWithMenuItemsById(id).FirstOrDefaultAsync();
                if (foodType == null)
                {
                    return NotFound($"Food type with ID {id} not found.");
                }

                return Ok(foodType);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching the food type." });
            }
        }

        [HttpGet("ingredients")]
        public async Task<IActionResult> GetAllIngredients()
        {
            try
            {
                var ingredients = await _ingredientRepo.GetAllAsync();
                
                return Ok(ingredients);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching ingredients." });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateFoodType([FromBody] FoodType foodType)
        {
            try
            {
                
                if (foodType == null)
                {
                    return BadRequest("Food type is null.");
                }

                if (string.IsNullOrWhiteSpace(foodType.TypeOfFoodName))
                {
                    return BadRequest("Food type name is required.");
                }

                await _foodTypeRepo.CreateAsync(foodType);
                return Ok("Food type created successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating the food type." });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFoodType(int id, [FromBody] FoodType foodType)
        {
            try
            {
                var foodTypeToUpdate = await _foodTypeRepo.GetByIdAsync(f => f.TypeOfFoodId == id);
                if (foodTypeToUpdate == null)
                {
                    return NotFound($"Food type with ID {id} not found.");
                }

                await _foodTypeRepo.UpdateAsync(f => f.TypeOfFoodId == id, f => 
                {
                    f.TypeOfFoodName = foodType.TypeOfFoodName;
                });

                return Ok("Food type updated successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while updating the food type." });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFoodType(int id)
        {
            try
            {
                var foodTypeToDelete = await _foodTypeRepo.GetByIdAsync(f => f.TypeOfFoodId == id);
                var menuItemQuantity = _foodTypeRepo.CountMenuItemsById(id).Count();

                if (menuItemQuantity > 0)
                {
                    return BadRequest("Cannot delete food type because it has menu items.");
                }

                if (foodTypeToDelete == null)
                {
                    return NotFound($"Food type with ID {id} not found.");
                }

                await _foodTypeRepo.DeleteAsync(f => f.TypeOfFoodId == id);
                
                return Ok("Food type deleted successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while deleting the food type." });
            }
        }
    }
}
