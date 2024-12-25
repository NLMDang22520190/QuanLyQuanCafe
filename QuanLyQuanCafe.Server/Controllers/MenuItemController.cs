
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using AutoMapper;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Repositories;
using QuanLyQuanCafe.Server.Mapping;

namespace QuanLyQuanCafe.Server.Controllers
{

    [Route("api/menu-items")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly IMenuItemRepository _menuItemRepo;
        private readonly AutoMapperProfile _mapper;

        public MenuItemController(IMenuItemRepository menuItemRepo, AutoMapperProfile autoMapperProfile)
        {
            _menuItemRepo = menuItemRepo;
            _mapper = autoMapperProfile;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMenuItems()
        {
            try
            {
                var menuItems = await _menuItemRepo.GetAllAsync();

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
                var menuItem = await _menuItemRepo.GetByIdAsync(f => f.ItemId == id);
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
                var menuItem = await _menuItemRepo.GetByIdAsync(f => f.ItemId == id);
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

                await _menuItemRepo.UpdateAsync(f => f.ItemId == menuItem.ItemId, m => m.State = menuItem.State);

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
                var mostSoldMenuItems = await _menuItemRepo.GetMostSoldMenuItems().ToListAsync();
                var leastSoldMenuItems = await _menuItemRepo.GetLeastSoldMenuItems().ToListAsync();

                return Ok(new { mostSoldMenuItems, leastSoldMenuItems });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching menu items statistics." });
            }
        }

        //[HttpGet("FeatureProducts")]
        //public async Task<IActionResult> GetFeatureProducts()
        //{
        //    var menuItemDomain = await _menuItemRepo.GetFeatureMenuItemAsync();
        //    if (menuItemDomain == null)
        //    {
        //        return NotFound($"No feature prods found");
        //    }

        //    return Ok(_mapper.Map<List<FeatureMenuItemDTO>>(menuItemDomain));
        //}

        //[HttpGet("GetProdByCategoryId/{categoryId}")]
        //public async Task<IActionResult> GetProdsByCategoryId(int categoryId)
        //{
        //    var menuItemDomain = await _menuItemRepo.GetMenuItemsByCategoryIdAsync(categoryId);
        //    if (menuItemDomain == null)
        //    {
        //        return NotFound($"No prods by {categoryId} found");
        //    }

        //    return Ok(_mapper.Map<List<ItemOnMenuPageDTO>>(menuItemDomain));
    }



}
