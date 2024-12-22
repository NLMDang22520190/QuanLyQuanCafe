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

        [HttpGet("FeatureProducts")]
        public async Task<IActionResult> GetFeatureProducts()
        {
            var menuItemDomain = await _menuItemRepository.GetFeatureMenuItemAsync();
            if (menuItemDomain == null)
            {
                return NotFound($"No feature prods found");
            }

            return Ok(_mapper.Map<List<FeatureMenuItem>>(menuItemDomain));
        }

        [HttpGet("GetProdByCategoryId/{categoryId}")]
        public async Task<IActionResult> GetProdsByCategoryId(int categoryId)
        {
            var menuItemDomain = await _menuItemRepository.GetMenuItemsByCategoryIdAsync(categoryId);
            if (menuItemDomain == null)
            {
                return NotFound($"No prods by {categoryId} found");
            }

            return Ok(_mapper.Map<List<ItemOnMenuPage>>(menuItemDomain));
        }

    }
}
