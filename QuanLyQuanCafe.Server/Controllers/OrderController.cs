using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using AutoMapper;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{

	[Route("api/orders")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

		public OrderController(IOrderRepository orderRepository, IMapper mapper)
		{
			_orderRepository = orderRepository;
            _mapper = mapper;
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

		[HttpGet("pending")]
		public async Task<IActionResult> GetPendingOrders()
		{
			var orders = await _orderRepository.GetPendingOrdersAsync();
			return Ok(orders);
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


        [HttpGet("GetOrderDetailsByUserId/{userId}")]
        public async Task<IActionResult> GetOrderDetailsByUserId(string userId)
        {
            var order = await _orderRepository.GetOrderDetailsByUserIdAsync(userId);
            if (order == null || !order.Any())
            {
                return NotFound($"No orders found for UserId {userId}");
            }
            return Ok(_mapper.Map<List<OrderWithOrderDetailDTO>>(order));
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

