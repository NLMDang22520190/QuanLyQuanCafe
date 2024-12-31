using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
	[Route("api/order-details")]
	[ApiController]
	public class OrderDetailController : ControllerBase
	{
		private readonly IOrderDetailRepository _orderDetailRepo;

		public OrderDetailController(IOrderDetailRepository orderDetailRepo)
		{
			_orderDetailRepo = orderDetailRepo;
		}

		[HttpGet("order/{orderId}")]
		public async Task<IActionResult> GetOrderDetailsByOrderId(int orderId)
		{
			var orderDetails = await _orderDetailRepo.GetOrderDetailsByOrderIdAsync(orderId);
			if (orderDetails == null || !orderDetails.Any())
			{
				return NotFound($"No order details found for OrderId {orderId}");
			}
			return Ok(orderDetails);
		}


		[HttpPut("{orderDetailId}")]
		public async Task<IActionResult> UpdateNotesOrAdjustments(int orderDetailId, [FromBody] dynamic payload)
		{
			string? notes = payload.notes;
			string? adjustments = payload.adjustments;

			var updated = await _orderDetailRepo.UpdateNotesOrAdjustmentsAsync(orderDetailId, notes, adjustments);
			if (!updated)
			{
				return NotFound($"Order detail with ID {orderDetailId} not found.");
			}
			return NoContent();
		}
	}
}
