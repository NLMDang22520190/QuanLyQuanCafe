using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
	[Route("api/orders")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _orderRepo;

		public OrderController(IOrderRepository orderRepo)
		{
			_orderRepo = orderRepo;
		}

		[HttpGet("{orderId}")]
		public async Task<IActionResult> GetOrderById(int orderId)
		{
			var order = await _orderRepo.GetOrderByIdAsync(orderId);
			if (order == null)
			{
				return NotFound($"No order found with OrderId {orderId}");
			}
			return Ok(order);
		}

		[HttpGet("user/{userId}")]
		public async Task<IActionResult> GetOrdersByUserId(string userId)
		{
			var orders = await _orderRepo.GetOrdersByUserIdAsync(userId);
			if (orders == null || !orders.Any())
			{
				return NotFound($"No orders found for UserId {userId}");
			}
			return Ok(orders);
		}

		[HttpPut("{orderId}/state")]
		public async Task<IActionResult> UpdateOrderState(int orderId, [FromBody] string newState)
		{
			var updated = await _orderRepo.UpdateOrderStateAsync(orderId, newState);
			if (!updated)
			{
				return NotFound($"Order with OrderId {orderId} not found.");
			}
			return NoContent();
		}

		[HttpPut("{orderId}/payment-method")]
		public async Task<IActionResult> UpdatePaymentMethod(int orderId, [FromBody] string paymentMethod)
		{
			var updated = await _orderRepo.UpdatePaymentMethodAsync(orderId, paymentMethod);
			if (!updated)
			{
				return NotFound($"Order with OrderId {orderId} not found.");
			}
			return NoContent();
		}
	}
}
