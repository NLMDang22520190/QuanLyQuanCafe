
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using AutoMapper;
using QuanLyQuanCafe.Server.Models.DTO.ADD;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;
using QuanLyQuanCafe.Server.Repositories;
using QuanLyQuanCafe.Server.Mapping;

namespace QuanLyQuanCafe.Server.Controllers
{

    [Route("api/menu-items")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {

        private readonly IMenuItemRepository _menuItemRepository;
        private readonly IItemRecipeRepository _itemRecipeRepository;
        private readonly IMapper _mapper;

        public MenuItemController(IMenuItemRepository menuItemRepo, IItemRecipeRepository itemRecipeRepo, IMapper mapper)
        {
            _menuItemRepository = menuItemRepo;
            _itemRecipeRepository = itemRecipeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMenuItems()
        {
            try
            {
                var menuItems = await _menuItemRepository.GetAllAsync();

                if (menuItems == null || !menuItems.Any())
                {
                    return NotFound("No menu items found.");
                }
                return Ok(menuItems);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching menu items." });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMenuItemById(int id)
        {
            try
            {
                var menuItem = await _menuItemRepository.GetByIdAsync(f => f.ItemId == id);
                if (menuItem == null)
                {
                    return NotFound($"Menu item with ID {id} not found.");
                }

                return Ok(menuItem);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching the menu item." });
            }
        }

        [HttpPut("{id}/change-availability")]
        public async Task<IActionResult> ChangeProductAvailability(int id)
        {
            try
            {
                var menuItem = await _menuItemRepository.GetByIdAsync(f => f.ItemId == id);
                if (menuItem == null)
                {
                    return NotFound($"Menu item with ID {id} not found.");
                }

                if (menuItem.State == "Available")
                {
                    menuItem.State = "Unavailable";
                }
                else
                {
                    menuItem.State = "Available";
                }

                await _menuItemRepository.UpdateAsync(f => f.ItemId == menuItem.ItemId, m => m.State = menuItem.State);

                return Ok("Product availability changed successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while changing product availability." });
            }
        }

        [HttpGet("statistics")]
        public async Task<IActionResult> GetMenuItemsStatistics()
        {
            try
            {
                var mostSoldMenuItems = await _menuItemRepository.GetMostSoldMenuItems().ToListAsync();
                var leastSoldMenuItems = await _menuItemRepository.GetLeastSoldMenuItems().ToListAsync();

                return Ok(new { mostSoldMenuItems, leastSoldMenuItems });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching menu items statistics." });
            }
        }

        [HttpGet("FeatureProducts")]
        public async Task<IActionResult> GetFeatureProducts()
        {
            var menuItemDomain = await _menuItemRepository.GetFeatureMenuItemAsync();
            if (menuItemDomain == null)
            {
                return NotFound($"No feature prods found");
            }

            return Ok(_mapper.Map<List<FeatureMenuItemDTO>>(menuItemDomain));
        }

        [HttpGet("GetProdByCategoryId/{categoryId}")]
        public async Task<IActionResult> GetProdsByCategoryId(int categoryId)
        {
            var menuItemDomain = await _menuItemRepository.GetMenuItemsByCategoryIdAsync(categoryId);
            if (menuItemDomain == null)
            {
                return NotFound($"No prods by {categoryId} found");
            }

            return Ok(_mapper.Map<List<ItemOnMenuPageDTO>>(menuItemDomain));
        }

        [HttpGet("all-with-recipies")]
        public async Task<IActionResult> GetAllMenuItemsWithRecipes()
        {
            var menuItems = await _menuItemRepository.GetAllWithRecipesAsync();
            if (menuItems == null || !menuItems.Any())
            {
                return NotFound("No menu items found.");
            }
            return Ok(menuItems);
        }

        [HttpGet("with-recipies/{id}")]
        public async Task<IActionResult> GetMenuItemWithRecipesById(int id)
        {
            var menuItem = await _menuItemRepository.GetMenuItemWithRecipesByIdAsync(id);
            if (menuItem == null)
            {
                return NotFound($"Menu item with ID {id} not found.");
            }
            return Ok(menuItem);
        }

        [HttpPost("AddProduct")]
        public async Task<IActionResult> AddProduct([FromBody] AddItemRequestDTO requestDto)
        {
            try
            {
                var menuItemDomain = _mapper.Map<MenuItem>(requestDto);
                menuItemDomain = await _menuItemRepository.CreateAsync(menuItemDomain);

                if(menuItemDomain == null)
                {
                    return BadRequest("Error adding product");
                }
                return Ok("Product added successfully!" + menuItemDomain.ItemId);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error adding product: {ex.Message}");
            }
        }

        [HttpPut("UpdateProduct")]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateItemRequestDTO requestDto)
        {
            try
            {
                var menuItemDomain = _mapper.Map<MenuItem>(requestDto);

                var existingRecipe = await _itemRecipeRepository.GetByIdAsync(f => f.ItemId == requestDto.ItemId);
                if (existingRecipe != null)
                {
                    await _itemRecipeRepository.DeleteAsync(f => f.ItemId == requestDto.ItemId);
                }

                foreach (var newRecipe in requestDto.ItemRecipes)
                {
                    var itemRecipe = _mapper.Map<ItemRecipe>(newRecipe);
                    itemRecipe.ItemId = requestDto.ItemId;
                    await _itemRecipeRepository.CreateAsync(itemRecipe);
                }

                menuItemDomain = await _menuItemRepository.UpdateAsync(f => f.ItemId == requestDto.ItemId, m =>
                {
                    m.ItemName = requestDto.ItemName;
                    m.Description = requestDto.Description;
                    m.Price = requestDto.Price;
                    m.Picture = requestDto.Picture;
                    m.TypeOfFoodId = requestDto.TypeOfFoodId;
                    m.ItemRecipes = _mapper.Map<ICollection<ItemRecipe>>(requestDto.ItemRecipes);
                });

                if (menuItemDomain == null)
                {
                    return NotFound($"Product with ID {requestDto.ItemId} not found.");
                }
                return Ok("Product updated successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while updating product:" + ex.Message });
            }
        }
    }
}


