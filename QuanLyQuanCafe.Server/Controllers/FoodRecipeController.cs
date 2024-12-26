using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FoodRecipeController : ControllerBase
    {
        private readonly IItemRecipeRepository _itemRecipeRepository;
        private readonly IMapper _mapper;

        public FoodRecipeController(IItemRecipeRepository itemRecipeRepository, IMapper mapper)
        {
            _itemRecipeRepository = itemRecipeRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllRecipe")]
        public async Task<IActionResult> GetAllRecipe()
        {
            try
            {
                var recipes = await _itemRecipeRepository.GetAllAsync();
                if (recipes == null || !recipes.Any())
                {
                    return NotFound("No recipes found.");
                }
                return Ok(_mapper.Map<List<ItemRecipeDTO>>(recipes));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching recipes." });
            }
        }

        [HttpGet("GetRecipeByItemId/{itemId}")]
        public async Task<IActionResult> GetRecipeByItemId(int itemId)
        {
            try
            {
                var recipes = await _itemRecipeRepository.GetItemRecipeByItemId(itemId);
                if (recipes == null || recipes.Count == 0)
                {
                    return NotFound($"Recipe with ItemId {itemId} not found.");
                }
                return Ok(_mapper.Map<List<ItemRecipeDTO>>(recipes));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching recipe." });
            }
        }

        [HttpPut("UpdateRecipe")]
        public async Task<IActionResult> UpdateRecipe([FromBody] UpdateItemRecipeRequestDTO requestDto)
        {
            try
            {
                var recipeDomain = _mapper.Map<ItemRecipe>(requestDto);
                recipeDomain =  await _itemRecipeRepository.UpdateAsync(ir => ir.ItemId == requestDto.ItemId 
                                                              && ir.IngredientId == requestDto.IngredientId, 
                    existingRecord =>
                {
                    existingRecord.Quantity = requestDto.Quantity;
                });

                if (recipeDomain == null)
                {
                    return NotFound($"Recipe with ItemId {requestDto.ItemId} and IngredientId {requestDto.IngredientId} not found.");
                }

                return Ok("Recipe updated successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while updating recipe." });
            }
        }

        [HttpDelete("DeleteRecipe/{itemId}/{ingredientId}")]
        public async Task<IActionResult> DeleteRecipe(int itemId, int ingredientId)
        {
            try
            {
                var recipe = await _itemRecipeRepository.DeleteAsync(ir => ir.ItemId == itemId && ir.IngredientId == ingredientId);
                if (recipe == null)
                {
                    return NotFound($"Recipe with ItemId {itemId} and IngredientId {ingredientId} not found.");
                }
                return Ok("Recipe deleted successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while deleting recipe." });
            }
        }

        [HttpDelete("DeleteRecipeByItemId/{itemId}")]
        public async Task<IActionResult> DeleteRecipeByItemId(int itemId)
        {
            try
            {
                var isDeleted = await _itemRecipeRepository.DeleteItemRecipeByItemId(itemId);
                if (!isDeleted)
                {
                    return NotFound($"Recipe with ItemId {itemId} not found.");
                }
                return Ok("Recipe deleted successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while deleting recipe." });
            }
        }
    }
}
