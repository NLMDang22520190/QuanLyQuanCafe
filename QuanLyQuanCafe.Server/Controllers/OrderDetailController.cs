using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuanLyQuanCafe.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderDetailController : ControllerBase
	{
		private readonly IOrderDetailRepository _orderDetailRepository;

		public OrderDetailController(IOrderDetailRepository orderDetailRepository)
		{
			_orderDetailRepository = orderDetailRepository;
		}

		// Lấy tất cả chi tiết đơn hàng
		[HttpGet("get-all")]
		public async Task<ActionResult<List<OrderDetail>>> GetAllOrderDetails()
		{
			var orderDetails = await _orderDetailRepository.GetAllAsync();
			if (orderDetails == null || orderDetails.Count == 0)
			{
				return NotFound("No order details found.");
			}
			return Ok(orderDetails);
		}

		// Lấy tất cả chi tiết đơn hàng theo orderId
		[HttpGet("get-by-order-id/{orderId}")]
		public async Task<ActionResult<List<OrderDetail>>> GetOrderDetailsByOrderId(int orderId)
		{
			if (orderId <= 0)
			{
				return BadRequest("Invalid order ID.");
			}

			var orderDetails = await _orderDetailRepository.GetOrderDetailsByOrderIdAsync(orderId);
			if (orderDetails == null || orderDetails.Count == 0)
			{
				return NotFound($"No order details found for order ID {orderId}.");
			}
			return Ok(orderDetails);
		}

		// Lấy tổng số lượng món đã đặt theo itemId
		[HttpGet("total-quantity-ordered-by-item-id/{itemId}")]
		public async Task<ActionResult<int>> GetTotalQuantityOrderedByItemId(int itemId)
		{
			if (itemId <= 0)
			{
				return BadRequest("Invalid item ID.");
			}

			var totalQuantity = await _orderDetailRepository.GetTotalQuantityOrderedByItemIdAsync(itemId);
			return Ok(totalQuantity);
		}

		// Lấy số lần món đã được đặt theo itemId
		[HttpGet("total-times-ordered-by-item-id/{itemId}")]
		public async Task<ActionResult<int>> GetTotalTimesOrderedByItemId(int itemId)
		{
			if (itemId <= 0)
			{
				return BadRequest("Invalid item ID.");
			}

			var totalTimes = await _orderDetailRepository.GetTotalTimesOrderedByItemIdAsync(itemId);
			return Ok(totalTimes);
		}

		// Cập nhật ghi chú hoặc điều chỉnh cho chi tiết đơn hàng
		[HttpPut("update-notes-or-adjustments/{orderDetailId}")]
		public async Task<ActionResult> UpdateNotesOrAdjustments(int orderDetailId, [FromBody] UpdateOrderDetailRequest updateRequest)
		{
			if (updateRequest == null)
			{
				return BadRequest("Update request is null.");
			}

			var result = await _orderDetailRepository.UpdateNotesOrAdjustmentsAsync(orderDetailId, updateRequest);
			if (!result)
			{
				return NotFound($"Order detail with ID {orderDetailId} not found.");
			}

			return Ok($"Order detail ID {orderDetailId} updated successfully.");
		}

		// Thêm một chi tiết đơn hàng
		[HttpPost("add")]
		public async Task<ActionResult<OrderDetail>> AddOrderDetail([FromBody] OrderDetail orderDetail)
		{
			if (orderDetail == null)
			{
				return BadRequest("Order detail is null.");
			}

			await _orderDetailRepository.AddAsync(orderDetail);
			return CreatedAtAction(nameof(GetOrderDetailById), new { orderDetailId = orderDetail.OrderDetailId }, orderDetail);
		}

		// Xóa một chi tiết đơn hàng
		[HttpDelete("remove/{orderDetailId}")]
		public async Task<ActionResult> RemoveOrderDetail(int orderDetailId)
		{
			var orderDetail = await _orderDetailRepository.GetByIdAsync(orderDetailId);
			if (orderDetail == null)
			{
				return NotFound($"Order detail with ID {orderDetailId} not found.");
			}

			await _orderDetailRepository.RemoveAsync(orderDetail);
			return Ok($"Order detail ID {orderDetailId} removed successfully.");
		}

		// Lấy chi tiết đơn hàng theo ID
		[HttpGet("{orderDetailId}")]
		public async Task<ActionResult<OrderDetail>> GetOrderDetailById(int orderDetailId)
		{
			if (orderDetailId <= 0)
			{
				return BadRequest("Invalid order detail ID.");
			}

			var orderDetail = await _orderDetailRepository.GetByIdAsync(orderDetailId);
			if (orderDetail == null)
			{
				return NotFound($"Order detail with ID {orderDetailId} not found.");
			}
			return Ok(orderDetail);
		}
	}
}
