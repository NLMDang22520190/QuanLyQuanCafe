using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MenuItemController : ControllerBase
	{
		private readonly IMenuItemRepository _menuItemRepository;
		private readonly IMapper _mapper;

		public MenuItemController(IMenuItemRepository menuItemRepository, IMapper mapper)
		{
			_menuItemRepository = menuItemRepository;
			_mapper = mapper;
		}

		// Get feature products (random 8 items)
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

		// Get products by category ID
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

		// Get all menu items
		[HttpGet]
		public async Task<IActionResult> GetAllMenuItems()
		{
			var menuItems = await _menuItemRepository.GetAllMenuItemsAsync();
			if (menuItems == null || !menuItems.Any())
			{
				return NotFound("No menu items found.");
			}

			return Ok(_mapper.Map<List<ItemOnMenuPageDTO>>(menuItems));
		}

		// Get a menu item by its ID
		[HttpGet("{menuItemId}")]
		public async Task<IActionResult> GetMenuItemById(int menuItemId)
		{
			var menuItem = await _menuItemRepository.GetMenuItemByIdAsync(menuItemId);
			if (menuItem == null)
			{
				return NotFound($"No menu item found with id {menuItemId}");
			}

			return Ok(_mapper.Map<ItemOnMenuPageDTO>(menuItem));
		}
	}
}
