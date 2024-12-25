using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{

	[Route("api/orders")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _orderRepository;

		public OrderController(IOrderRepository orderRepository)
		{
			_orderRepository = orderRepository;
		}

		[HttpGet("statistics")]
		public async Task<ActionResult<List<OrderStatisticDTO>>> GetOrderStatistics()
		{
			var orderSummaries = await _orderRepository.GetTotalOrderAmountByMonths();
			return Ok(orderSummaries);
		}




		[HttpGet("{orderId}")]
		public async Task<IActionResult> GetOrderById(int orderId)
		{
			var order = await _orderRepository.GetOrderByIdAsync(orderId);
			if (order == null)
			{
				return NotFound($"No order found with OrderId {orderId}");
			}
			return Ok(order);
		}

		[HttpGet("user/{userId}")]
		public async Task<IActionResult> GetOrdersByUserId(string userId)
		{
			var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
			if (orders == null || !orders.Any())
			{
				return NotFound($"No orders found for UserId {userId}");
			}
			return Ok(orders);
		}

		[HttpPut("{orderId}/state")]
		public async Task<IActionResult> UpdateOrderState(int orderId, [FromBody] string newState)
		{
			var updated = await _orderRepository.UpdateOrderStateAsync(orderId, newState);
			if (!updated)
			{
				return NotFound($"Order with OrderId {orderId} not found.");
			}
			return NoContent();
		}

		[HttpPut("{orderId}/payment-method")]
		public async Task<IActionResult> UpdatePaymentMethod(int orderId, [FromBody] string paymentMethod)
		{
			var updated = await _orderRepository.UpdatePaymentMethodAsync(orderId, paymentMethod);
			if (!updated)
			{
				return NotFound($"Order with OrderId {orderId} not found.");
			}
			return NoContent();
		}

	}
}
