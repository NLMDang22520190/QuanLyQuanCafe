using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyQuanCafe.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _orderRepository;

		public OrderController(IOrderRepository orderRepository)
		{
			_orderRepository = orderRepository;
		}

		// Lấy tất cả các đơn hàng
		[HttpGet("get-all")]
		public async Task<ActionResult<List<Order>>> GetAllOrders()
		{
			var orders = await _orderRepository.GetAllAsync();
			if (orders == null || orders.Count == 0)
			{
				return NotFound("No orders found.");
			}
			return Ok(orders);
		}

		// Lấy tổng số tiền của các đơn hàng theo tháng
		[HttpGet("total-order-amount-by-months")]
		public async Task<ActionResult<List<OrderStatisticDTO>>> GetTotalOrderAmountByMonths()
		{
			var statistics = await _orderRepository.GetTotalOrderAmountByMonths();
			return Ok(statistics);
		}

		// Lấy chi tiết đơn hàng theo ID
		[HttpGet("{orderId}")]
		public async Task<ActionResult<Order>> GetOrderById(int orderId)
		{
			var order = await _orderRepository.GetOrderByIdAsync(orderId);
			if (order == null)
			{
				return NotFound($"Order with ID {orderId} not found.");
			}
			return Ok(order);
		}

		// Lấy tất cả các đơn hàng có trạng thái "Pending"
		[HttpGet("pending")]
		public async Task<ActionResult<List<Order>>> GetPendingOrders()
		{
			var orders = await _orderRepository.GetPendingOrdersAsync();
			return Ok(orders);
		}

		// Lấy tất cả các đơn hàng của một người dùng theo userId
		[HttpGet("user/{userId}")]
		public async Task<ActionResult<IEnumerable<Order>>> GetOrdersByUserId(string userId)
		{
			var orders = await _orderRepository.GetOrdersByUserIdAsync(userId);
			if (orders == null || !orders.Any())
			{
				return NotFound($"No orders found for user {userId}");
			}
			return Ok(orders);
		}

		// Thêm mới đơn hàng
		[HttpPost("add")]
		public async Task<ActionResult<Order>> AddOrder([FromBody] Order order)
		{
			if (order == null)
			{
				return BadRequest("Order data is required.");
			}

			// Add a new order to the database
			var newOrder = await _orderRepository.AddAsync(order);

			// Return the newly created order with status 201 (Created)
			return CreatedAtAction(nameof(GetOrderById), new { orderId = newOrder.OrderId }, newOrder);
		}

		// Cập nhật trạng thái của đơn hàng
		[HttpPut("update-order-state/{orderId}")]
		public async Task<ActionResult> UpdateOrderState(int orderId, [FromBody] string newState)
		{
			var result = await _orderRepository.UpdateOrderStateAsync(orderId, newState);
			if (!result)
			{
				return NotFound($"Order with ID {orderId} not found.");
			}
			return NoContent();
		}

		// Cập nhật phương thức thanh toán của đơn hàng
		[HttpPut("update-payment-method/{orderId}")]
		public async Task<ActionResult> UpdatePaymentMethod(int orderId, [FromBody] string paymentMethod)
		{
			var result = await _orderRepository.UpdatePaymentMethodAsync(orderId, paymentMethod);
			if (!result)
			{
				return NotFound($"Order with ID {orderId} not found.");
			}
			return NoContent();
		}
	}
}
