using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.ADD;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;
using QuanLyQuanCafe.Server.Repositories;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
	private readonly ICartRepository _cartRepository;

	public CartController(ICartRepository cartRepository)
	{
		_cartRepository = cartRepository;
	}

	// Get cart details by customer ID
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

	[HttpPost("AddItemToCart")]
	public async Task<IActionResult> AddItemToCart([FromBody] AddCartItemRequestDTO addItemRequest)
	{
		try
		{
			// Check if quantity is valid
			if (addItemRequest.Quantity <= 0)
			{
				return BadRequest(new { error = "Quantity must be greater than zero." });
			}

			// Retrieve the cart or create a new one if it doesn't exist
			var cart = await _cartRepository.GetCartByCustomerId(addItemRequest.UserId);
			if (cart == null)
			{
				// Create a new cart for the customer if not found
				cart = await _cartRepository.CreateCartForCustomer(addItemRequest.UserId);
			}

			// Create the CartDetail object for the item being added
			var cartDetail = new CartDetail
			{
				CartId = cart.CartId,
				ItemId = addItemRequest.ItemId,
				Quantity = addItemRequest.Quantity,
				Notes = addItemRequest.Notes,
				Adjustments = addItemRequest.Adjustments
			};

			// Add the item to the cart (now passing individual parameters)
			await _cartRepository.AddItemToCart(addItemRequest.UserId, addItemRequest.ItemId, addItemRequest.Quantity, addItemRequest.Notes, addItemRequest.Adjustments);

			// Return a success message
			return Ok(new { message = "Item added to cart successfully." });
		}
		catch (Exception ex)
		{
			Console.WriteLine($"Error adding item to cart: {ex.Message}");
			return StatusCode(500, new { error = "An error occurred while adding the item to the cart.", details = ex.Message });
		}
	}

	[HttpDelete("RemoveItemFromCart/{userId}/{itemId}")]
	public async Task<IActionResult> RemoveItemFromCart(string userId, int itemId)
	{
		try
		{
			// Call the repository method to remove the item from the cart
			await _cartRepository.RemoveItemFromCart(userId, itemId);

			return Ok(new { message = "Item removed from cart successfully." });
		}
		catch (ArgumentException ex)
		{
			// Handle the case where the item is not found in the cart
			return NotFound(new { error = ex.Message });
		}
		catch (Exception ex)
		{
			// Handle any other errors
			Console.WriteLine($"Error removing item from cart: {ex.Message}");
			return StatusCode(500, new { error = "An error occurred while removing the item from the cart.", details = ex.Message });
		}
	}

	[HttpPut("UpdateCartDetail")]
	public async Task<IActionResult> UpdateCartDetail([FromBody] UpdateCartItemRequestDTO request)
	{
		// Validate the request
		if (request == null || request.CartDetailId <= 0 || request.Quantity <= 0)
		{
			return BadRequest(new { error = "Invalid data provided." });
		}

		try
		{
			// Get the cart from the repository
			var cart = await _cartRepository.GetCartById(request.CartId);
			if (cart == null)
			{
				return NotFound(new { error = "Cart not found." });
			}

			// Find the cart detail to update
			var cartDetail = cart.CartDetails.FirstOrDefault(cd => cd.CartDetailId == request.CartDetailId);
			if (cartDetail == null)
			{
				return NotFound(new { error = "Cart detail not found." });
			}

			// Update the cart detail fields
			cartDetail.Quantity = request.Quantity;
			cartDetail.Notes = request.Notes;
			cartDetail.Adjustments = request.Adjustment;

			// Call EditCartItem on the repository with all the required parameters
			bool isUpdated = await _cartRepository.EditCartItem(
				request.UserId,               // UserId
				request.CartDetailId,         // CartDetailId
				request.Quantity,             // Quantity
				request.Notes,                // Notes
				request.Adjustment            // Adjustments
			);

			if (!isUpdated)
			{
				return StatusCode(500, new { error = "Failed to update cart detail." });
			}

			// Return a success response
			return Ok(new { message = "Cart detail updated successfully." });
		}
		catch (Exception ex)
		{
			// Handle any unexpected errors
			Console.WriteLine($"Error updating cart detail: {ex.Message}");
			return StatusCode(500, new { error = "An error occurred while updating the cart detail.", details = ex.Message });
		}
	}
}
