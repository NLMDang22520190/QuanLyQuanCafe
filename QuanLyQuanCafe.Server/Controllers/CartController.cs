using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.ADD;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;
using QuanLyQuanCafe.Server.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyQuanCafe.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class CartController : ControllerBase
	{
		private readonly ICartRepository _cartRepository;
		private readonly ICartDetailRepository _cartDetailRepository;

		public CartController(ICartRepository cartRepository, ICartDetailRepository cartDetailRepository)
		{
			_cartRepository = cartRepository;
			_cartDetailRepository = cartDetailRepository;
		}

		[HttpGet("GetCartDetailsByCustomerId/{userId}")]
		public async Task<IActionResult> GetCartDetailsByCustomerId(string userId)
		{
			try
			{
				var cart = await _cartRepository.GetCartByCustomerId(userId);

				if (cart == null)
				{
					return NotFound(new { error = "No cart found for the user." });
				}

				var cartDetails = cart.CartDetails.Select(cd => new
				{
					CartDetailId = cd.CartDetailId,
					CartId = cd.CartId,
					ItemId = cd.ItemId,
					Quantity = cd.Quantity,
					Notes = cd.Notes,
					Adjustments = cd.Adjustments,
					Item = new
					{
						cd.Item.ItemId,
						cd.Item.ItemName,
						cd.Item.Price
					}
				}).ToList();

				return Ok(cartDetails);
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error fetching cart details: {ex.Message}");
				return StatusCode(500, new { error = "An error occurred while fetching cart details.", details = ex.Message });
			}
		}

		[HttpPost("RemoveItemFromCart")]
		public async Task<IActionResult> RemoveItemFromCart([FromBody] RemoveCartItemRequestDTO request)
		{
			try
			{
				Console.WriteLine($"Removing item: UserId={request.UserId}, ItemId={request.ItemId}");

				if (string.IsNullOrEmpty(request.UserId) || request.ItemId <= 0)
				{
					return BadRequest(new { error = "Invalid request data." });
				}

				var cart = await _cartRepository.GetCartByCustomerId(request.UserId);
				if (cart == null)
				{
					return NotFound(new { error = "Cart not found." });
				}

				var cartDetail = await _cartDetailRepository.GetCartDetailByCartIdAndItemId(cart.CartId, request.ItemId);
				if (cartDetail == null)
				{
					return NotFound(new { error = "Item not found in cart." });
				}

				var result = await _cartDetailRepository.DeleteCartDetailByCartId(cartDetail.CartDetailId);
				if (result)
				{
					return NoContent(); // Successful removal
				}

				return BadRequest(new { error = "Failed to remove item from cart." });
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error: {ex.Message}");
				return StatusCode(500, new { error = "An error occurred while removing the item from the cart.", details = ex.Message });
			}
		}

		[HttpPut("UpdateCartItem")]
		public async Task<IActionResult> UpdateCartItem([FromBody] UpdateCartItemRequestDTO updateCartItemDto)
		{
			try
			{
				// Ensure the cart exists
				var cart = await _cartRepository.GetCartById(updateCartItemDto.CartId);

				if (cart == null)
				{
					return NotFound(new { message = "Cart not found." });
				}

				// Find the cart detail by cartDetailId
				var cartDetail = cart.CartDetails
					.FirstOrDefault(cd => cd.CartDetailId == updateCartItemDto.CartDetailId);

				if (cartDetail == null)
				{
					return NotFound(new { message = "Cart detail not found." });
				}

				// Update the necessary fields
				cartDetail.Quantity = updateCartItemDto.Quantity;
				cartDetail.Notes = updateCartItemDto.Notes;
				cartDetail.Adjustments = updateCartItemDto.Adjustment; // Assuming Adjustment is a valid field

				// Save the changes using the repository
				await _cartDetailRepository.UpdateCartDetail(cartDetail); // Just call the method without assigning to a variable

				return Ok(new { message = "Cart item updated successfully." });
			}
			catch (Exception ex)
			{
				return StatusCode(500, new { message = "An error occurred while updating the cart item.", error = ex.Message });
			}
		}


		// Clear Cart by UserId
		[HttpDelete("ClearCart/{userId}")]
		public async Task<IActionResult> ClearCart(string userId)
		{
			try
			{
				var cart = await _cartRepository.GetCartByCustomerId(userId);
				if (cart == null)
				{
					return NotFound(new { error = "No cart found for the user." });
				}

				foreach (var cartDetail in cart.CartDetails)
				{
					await _cartDetailRepository.DeleteCartDetailByCartId(cartDetail.CartDetailId);
				}

				return Ok(new { message = "Cart cleared successfully!" });
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error clearing cart: {ex.Message}");
				return StatusCode(500, new { error = "An error occurred while clearing the cart.", details = ex.Message });
			}
		}

		// Place an Order from the Cart
		[HttpPost("PlaceOrder/{userId}")]
		public async Task<IActionResult> PlaceOrder(string userId)
		{
			try
			{
				var cart = await _cartRepository.GetCartByCustomerId(userId);
				if (cart == null || !cart.CartDetails.Any())
				{
					return BadRequest(new { error = "Cart is empty or does not exist." });
				}

				decimal totalPrice = cart.CartDetails.Sum(cd => cd.Quantity * (decimal)cd.Item.Price);

				var order = new Order
				{
					UserId = userId,
					OrderTime = DateTime.Now,
					TotalPrice = (double)totalPrice,
					OrderState = "Pending"
				};

				foreach (var cartDetail in cart.CartDetails)
				{
					var orderDetail = new OrderDetail
					{
						ItemId = cartDetail.ItemId,
						Quantity = cartDetail.Quantity,
						Notes = cartDetail.Notes,
						Adjustments = cartDetail.Adjustments,
						Item = cartDetail.Item
					};
					order.OrderDetails.Add(orderDetail);
				}

				await _cartRepository.ClearCart(userId);  // Just call this method without assigning it to a variable

				return Ok(new { message = "Order placed successfully!" });
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error placing order: {ex.Message}");
				return StatusCode(500, new { error = "An error occurred while placing the order.", details = ex.Message });
			}
		}
	}
}
