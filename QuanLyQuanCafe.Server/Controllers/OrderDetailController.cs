using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Repositories;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyQuanCafe.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderDetailController : ControllerBase
	{
		private readonly IOrderDetailRepository _orderDetailRepository;
		private readonly IOrderRepository _orderRepository;
		private readonly ICartRepository _cartRepository;

		public OrderDetailController(IOrderDetailRepository orderDetailRepository, IOrderRepository orderRepository, ICartRepository cartRepository)
		{
			_orderDetailRepository = orderDetailRepository;
			_orderRepository = orderRepository;
			_cartRepository = cartRepository;
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

		// Thêm chi tiết đơn hàng từ giỏ hàng (Cart to OrderDetail conversion)
		[HttpPost("convert-cart-to-order")]
		public async Task<IActionResult> ConvertCartToOrderDetails([FromBody] CartToOrderRequest request)
		{
			try
			{
				// Step 1: Fetch the Cart using the CartRepository
				var cart = await _cartRepository.GetCartByUserIdAsync(request.UserId);

				if (cart == null || !cart.CartDetails.Any())
				{
					return BadRequest(new { Message = "Cart is empty or does not exist." });
				}

				// Step 2: Create the Order from the Cart
				var order = new Order
				{
					UserId = cart.UserId,
					OrderState = "Pending", // Default state
					TotalPrice = cart.CartDetails.Sum(cd => cd.Quantity * cd.Item.Price), // Calculate total price
					OrderTime = DateTime.Now,
					PaymentMethod = request.PaymentMethod,
					VoucherApplied = request.VoucherId // Optional voucher
				};

				// Step 3: Add the new order to the database
				var newOrder = await _orderRepository.AddAsync(order);

				// Step 4: Convert Cart Details to Order Details
				foreach (var cartDetail in cart.CartDetails)
				{
					var orderDetail = new OrderDetail
					{
						OrderId = newOrder.OrderId,
						ItemId = cartDetail.ItemId,
						Quantity = cartDetail.Quantity,
						Notes = cartDetail.Notes,
						Adjustments = cartDetail.Adjustments
					};

					// Add order details to the database
					await _orderDetailRepository.AddAsync(orderDetail);
				}

				// Step 5: Clear the Cart (Remove CartDetails and Cart)
				await _cartRepository.ClearCartAsync(cart);

				// Return success response with the order details
				return Ok(new
				{
					Message = "Cart converted to order and order details created successfully.",
					OrderId = newOrder.OrderId,
					TotalPrice = newOrder.TotalPrice
				});
			}
			catch (Exception ex)
			{
				// Handle unexpected errors
				return StatusCode(500, new { Error = ex.Message });
			}
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
	}
}
