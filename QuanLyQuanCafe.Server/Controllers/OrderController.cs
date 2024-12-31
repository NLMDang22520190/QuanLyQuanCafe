using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;
using QuanLyQuanCafe.Server.Models.DTO.ADD;
using AutoMapper;

namespace QuanLyQuanCafe.Server.Controllers
{

	[Route("api/orders")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _orderRepository;
		private readonly IMenuItemRepository _menuItemRepository;
		 private readonly IMapper _mapper;

		public OrderController(IOrderRepository orderRepository, IMenuItemRepository menuItemRepository, IMapper mapper)
		{
			_orderRepository = orderRepository;
			_menuItemRepository = menuItemRepository;	
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<IActionResult> GetOrders()
		{
			var orders = await _orderRepository.GetAllOrders();
			return Ok(orders);
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

		[HttpPost]
		public async Task<IActionResult> CreateOrder([FromBody] AddOrderRequestDTO requestDTO)
		{
			 if (requestDTO == null)
            {
                return BadRequest("Order data is null.");
            }

            // Fetch item prices and calculate total price
            double totalPrice = 0;
            foreach (var orderDetail in requestDTO.OrderDetails)
            {
				var menuItem = await _menuItemRepository.GetByIdAsync(m => m.ItemId == orderDetail.itemId);
                if (menuItem == null)
                {
                    return BadRequest($"Menu item with ID {orderDetail.itemId} not found.");
                }
                totalPrice += menuItem.Price * orderDetail.quantity;
            }

            var orderDomain = _mapper.Map<Order>(requestDTO);
            if (orderDomain == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "Mapping failed." });
            }

            orderDomain.TotalPrice = totalPrice;

            orderDomain = await _orderRepository.CreateAsync(orderDomain);

            if (orderDomain == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating the order." });
            }

			return Ok("Order created successfully.");
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

