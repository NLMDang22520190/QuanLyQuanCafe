using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        private readonly ICartDetailRepository _cartDetailRepository;
        private readonly IMapper _mapper;

        public CartController(ICartRepository cartRepository, ICartDetailRepository cartDetailRepository, IMapper mapper)
        {
            _cartRepository = cartRepository;
            _cartDetailRepository = cartDetailRepository;
            _mapper = mapper;
        }

        [HttpGet("GetCartDetailsByUserId/{userId}")]
        public async Task<IActionResult> GetCartDetailsByUserId(int userId)
        {
            var cart = await _cartRepository.GetCartByUserId(userId);
            if (cart == null)
            {
                return NotFound($"No cart found for UserId {userId}");
            }

            var cartDetails = await _cartDetailRepository.GetCartDetailByCartId(cart.CartId);
            if (cartDetails == null || !cartDetails.Any())
            {
                return NotFound($"No cart details found for CartId {cart.CartId}");
            }

            return Ok(cartDetails);
        }
    }
}
