using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.ADD;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;
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

        [HttpGet("GetCartIdByCustomerId/{customerId}")]
        public async Task<IActionResult> GetCartIdByCustomerId(string customerId)
        {
            var cartDomain = await _cartRepository.GetCartByCustomerId(customerId);
            if (cartDomain == null)
            {
                return NotFound($"No cart found for UserId {customerId}");
            }
            return Ok(cartDomain.CartId);
        }

        [HttpGet("GetCartDetailsByCustomerId/{customerId}")]
        public async Task<IActionResult> GetCartDetailsByCustomerId(string customerId)
        {
            var cartDomain = await _cartRepository.GetCartByCustomerId(customerId);
            if (cartDomain == null)
            {
                return NotFound($"No cart found for UserId {customerId}");
            }

            var cartDetailsDomain = await _cartDetailRepository.GetCartDetailByCartId(cartDomain.CartId);
            if (cartDetailsDomain == null)
            {
                return NotFound($"No cart details found for CartId {cartDomain.CartId}");
            }

            return Ok(_mapper.Map<List<CartItemDetailDTO>>(cartDetailsDomain));
        }

        // POST: api/Cart/AddItemToCart
        [HttpPost("AddItemToCart")]
        public async Task<IActionResult> AddItemToCart([FromBody] AddItemToCartRequestDTO requestDto)
        {
            try
            {
                // Gọi phương thức AddCartDetailAsync để thêm sản phẩm vào giỏ
                var cartDetailDomain = _mapper.Map<CartDetail>(requestDto);

                var cartAfterUpdate = await _cartDetailRepository.CreateAsync(cartDetailDomain);

                var cartDetailsDomain = await _cartDetailRepository.GetCartDetailByCartId(cartAfterUpdate.CartId);

                var cartDomain = cartDetailsDomain.FirstOrDefault(x => x.CartDetailId == cartAfterUpdate.CartDetailId);

                return Ok(_mapper.Map<CartItemDetailDTO>(cartDomain));
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có
                return BadRequest($"Error adding item to cart: {ex.Message}");
            }
        }

        [HttpPut("UpdateItemInCart")]
        public async Task<IActionResult> UpdateItemInCart([FromBody] UpdateCartItemRequestDTO requestDto)
        {
            try
            {
                // Ánh xạ dữ liệu từ DTO sang đối tượng CartDetail
                var cartDetail = _mapper.Map<CartDetail>(requestDto);

                // Sử dụng hàm tổng quan để cập nhật
                var updatedCartDetail = await _cartDetailRepository.UpdateAsync(
                    cd => cd.CartDetailId == requestDto.CartDetailId, // filter
                    existingRecord =>
                    {
                        existingRecord.Quantity = cartDetail.Quantity;
                        existingRecord.Notes = cartDetail.Notes;
                        existingRecord.Adjustments = cartDetail.Adjustments;
                    }
                );

                if (updatedCartDetail == null)
                {
                    return NotFound($"Cart detail with ID {requestDto.CartDetailId} not found.");
                }

                var cartDetailsDomain = await _cartDetailRepository.GetCartDetailByCartId(updatedCartDetail.CartId);

                var cartDomain = cartDetailsDomain.FirstOrDefault(x => x.CartDetailId == updatedCartDetail.CartDetailId);

                return Ok(_mapper.Map<CartItemDetailDTO>(cartDomain));
            }
            catch (Exception ex)
            {
                // Xử lý lỗi chung
                return BadRequest($"Error updating item in cart: {ex.Message}");
            }
        }

        [HttpDelete("DeleteItemFromCart/{cartDetailId}")]
        public async Task<IActionResult> DeleteItemFromCart(int cartDetailId)
        {
            try
            {
                // Gọi phương thức xóa từ repository và đợi kết quả
                var isDeleted = await _cartDetailRepository.DeleteCartDetailByCartId(cartDetailId);

                if (!isDeleted)
                {
                    return NotFound($"Cart detail with ID {cartDetailId} not found.");
                }

                return Ok($"Cart item with ID {cartDetailId} deleted successfully.");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error deleting item from cart: {ex.Message}");
            }
        }


    }
}
