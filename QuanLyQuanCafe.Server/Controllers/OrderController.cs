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
using QuanLyQuanCafe.Server.Models.DTO.ADD;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;


namespace QuanLyQuanCafe.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrderController : ControllerBase
	{
		private readonly IOrderRepository _orderRepository;
		private readonly ICartRepository _cartRepository;
		private readonly IMenuItemRepository _menuItemRepository;
		private readonly IVoucherDetailRepository _voucherDetailRepository;
		private readonly IIngredientRepository _ingredientRepository;
		 private readonly IMapper _mapper;

		public OrderController(IOrderRepository orderRepository, ICartRepository cartRepository, IMenuItemRepository menuItemRepository, IVoucherDetailRepository voucherDetailRepository, IIngredientRepository ingredientRepository, IMapper mapper)
		{
			_orderRepository = orderRepository;
			_cartRepository = cartRepository;
			_menuItemRepository = menuItemRepository;
			_voucherDetailRepository = voucherDetailRepository;	
			_ingredientRepository = ingredientRepository;	
			_mapper = mapper;
		}

		[HttpGet]
		public async Task<IActionResult> GetOrders()
		{
			var orders = await _orderRepository.GetAllOrders();
			return Ok(orders);
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

		[HttpPost]
		public async Task<IActionResult> CreateOrder([FromBody] AddOrderRequestDTO requestDTO)
		{
			 if (requestDTO == null)
            {
                return BadRequest("Order data is null.");
            }

			double totalPrice = 0;

            // Fetch item prices and calculate total price
            
            foreach (var orderDetail in requestDTO.OrderDetails)
            {
				var menuItem = await _menuItemRepository.GetByIdAsync(m => m.ItemId == orderDetail.itemId);

				var ingredientInStock = await _menuItemRepository.CheckStockOfItemIngredientAsync(orderDetail.itemId);
				if (!ingredientInStock) {
					return BadRequest($"Not enough ingredients to make this item.");
				}
				
                if (menuItem == null)
                {
                    return BadRequest($"Menu item with ID {orderDetail.itemId} not found.");
                }
                totalPrice += menuItem.Price * orderDetail.quantity;
            }

			if (requestDTO.VoucherApplied.HasValue)
			{
				var voucher = await _voucherDetailRepository.GetByIdAsync(v => v.VoucherId == requestDTO.VoucherApplied.Value);
				if (voucher == null)
				{
					return BadRequest($"Voucher with ID {requestDTO.VoucherApplied.Value} not found.");
				}

				if (voucher.VoucherEndDate.ToDateTime(TimeOnly.MinValue) < DateTime.Now || voucher.VoucherStartDate.ToDateTime(TimeOnly.MinValue) > DateTime.Now)
				{
					return BadRequest("Voucher time is not valid.");
				}

				if (voucher.MinOrderAmount > totalPrice)
				{
					return BadRequest("Total price is not enough to apply this voucher.");
				}

				double discountAmount = totalPrice * voucher.PercentDiscount / 100;
				totalPrice -= discountAmount;			
			}

            var orderDomain = _mapper.Map<Order>(requestDTO);
            if (orderDomain == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "Mapping failed." });
            }

            orderDomain.TotalPrice = totalPrice;

			orderDomain.OrderDetails = requestDTO.OrderDetails.Select(od => new OrderDetail
			{
				ItemId = od.itemId,
				Quantity = od.quantity
			}).ToList();		

            orderDomain = await _orderRepository.CreateOrderAsync(orderDomain);

            if (orderDomain == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating the order." });
            }

			return Ok("Order created successfully.");
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


  //      [HttpPut("{orderId}/state")]
		//public async Task<IActionResult> UpdateOrderState(int orderId, [FromBody] string newState)
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

		[HttpPost("CreateNewOrder")]
		public async Task<IActionResult> CreateNewOrder([FromBody] AddNewOrderRequestDTO request)
        {
            try
            {
                if (request.UserId == null)
                {
                    return BadRequest("UserId is required.");
                }

                var cart = await _cartRepository.GetCartByCustomerId(request.UserId);
                if (cart.CartDetails.Count == 0)
                {
                    return BadRequest("Cart is empty.");
                }

                var order = _mapper.Map<Order>(request);
                order.OrderState = "Chờ xác nhận";
                order.TotalPrice = cart.CartDetails.Sum(cd => cd.Quantity * cd.Item.Price);
                order.OrderTime = DateTime.Now;
                order.OrderDetails = _mapper.Map<List<OrderDetail>>(cart.CartDetails);

                foreach (var orderDetail in order.OrderDetails)
                {
                    var menuItem = await _menuItemRepository.GetByIdAsync(m => m.ItemId == orderDetail.ItemId);

                    var ingredientInStock = await _menuItemRepository.CheckStockOfItemIngredientAsync(orderDetail.ItemId);
                    if (!ingredientInStock)
                    {
                        return BadRequest($"Không đủ nguyên liệu");
                    }

                    if (menuItem == null)
                    {
                        return BadRequest($"Menu item with ID {orderDetail.ItemId} not found.");
                    }
                    order.TotalPrice += menuItem.Price * orderDetail.Quantity;
                }

                if (request.VoucherApplied.HasValue)
                {
                    var voucher = await _voucherDetailRepository.GetByIdAsync(v => v.VoucherId == request.VoucherApplied.Value);
                    if (voucher == null)
                    {
                        return BadRequest($"Voucher with ID {request.VoucherApplied.Value} not found.");
                    }

                    if (voucher.VoucherEndDate.ToDateTime(TimeOnly.MinValue) < DateTime.Now || voucher.VoucherStartDate.ToDateTime(TimeOnly.MinValue) > DateTime.Now)
                    {
                        return BadRequest("Voucher time is not valid.");
                    }

                    if (voucher.MinOrderAmount > order.TotalPrice)
                    {
                        return BadRequest("Total price is not enough to apply this voucher.");
                    }

                    double discountAmount = order.TotalPrice * voucher.PercentDiscount / 100;
                    order.TotalPrice -= discountAmount;
                }

                Debug.WriteLine(order);
                var newOrder = await _orderRepository.AddAsync(order);
                var result = await _cartRepository.ClearCartByCustomerId(request.UserId);
                if (!result)
                {
                    return BadRequest("Error clearing cart.");
                }
                return (Ok(_mapper.Map<OrderWithOrderDetailDTO>(newOrder)));
            }
            catch (Exception ex)
            {
				return BadRequest($"Error creating order: {ex.Message}");
            }


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

		// Thêm mới đơn hàng
		[HttpPost("CartToOrder")]
		public async Task<IActionResult> CartToOrder([FromBody] CartToOrderRequest request)
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
					VoucherApplied = request.VoucherId // Handle optional voucher
				};

				// Step 3: Add the new order to the database
				var newOrder = await _orderRepository.AddAsync(order);

				// Step 4: Add Order Details for each CartDetail
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

					await _orderRepository.AddOrderDetailAsync(orderDetail); // Assuming you have this method in the repository
				}

				// Step 5: Clear the Cart (Remove CartDetails and Cart)
				await _cartRepository.ClearCartAsync(cart);

				return Ok(new
				{
					Message = "Order created successfully.",
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
	}
}
