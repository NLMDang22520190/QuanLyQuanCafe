using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
	public class SQLOrderRepository : CoffeeManagementRepository<Order>, IOrderRepository
	{
		private readonly CoffeeManagementContext _dbContext;

		public SQLOrderRepository(CoffeeManagementContext dbContext) : base(dbContext)
		{
			_dbContext = dbContext;
		}

		// Lấy tất cả các đơn hàng
		public async Task<List<Order>> GetAllAsync()
		{
			return await _dbContext.Orders.ToListAsync();
		}

		// Lấy tổng số tiền của các đơn hàng theo tháng
		public async Task<List<OrderStatisticDTO>> GetTotalOrderAmountByMonths()
		{
			var totalOrderAmountByMonth = await _dbContext.Orders
				.GroupBy(o => new { o.OrderTime.Year, Month = o.OrderTime.Month })
				.Select(g => new OrderStatisticDTO
				{
					Month = $"{g.Key.Year}-{g.Key.Month:D2}",
					TotalIncome = g.Sum(o => o.TotalPrice)
				})
				.ToListAsync();

			return totalOrderAmountByMonth;
		}

		// Lấy chi tiết một đơn hàng theo ID
		public async Task<Order?> GetOrderByIdAsync(int orderId)
		{
			return await _dbContext.Orders
				.FirstOrDefaultAsync(o => o.OrderId == orderId);
		}

		// Lấy tất cả các đơn hàng với trạng thái "Pending"
		public async Task<List<Order>> GetPendingOrdersAsync()
		{
			return await _dbContext.Orders
				.Where(o => o.OrderState == "Pending")
				.ToListAsync();
		}

		// Lấy tất cả các đơn hàng của một người dùng theo userId
		public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
		{
			return await _dbContext.Orders
				.Where(o => o.UserId == userId)
				.ToListAsync();
		}

		// Thêm mới đơn hàng
		public async Task<Order> AddAsync(Order order)
		{
			// Thêm đơn hàng mới vào cơ sở dữ liệu
			await _dbContext.Orders.AddAsync(order);
			await _dbContext.SaveChangesAsync();

			return order;  // Trả về đơn hàng đã được thêm
		}

		// Cập nhật trạng thái của đơn hàng
		public async Task<bool> UpdateOrderStateAsync(int orderId, string newState)
		{
			var order = await _dbContext.Orders.FindAsync(orderId);
			if (order != null)
			{
				order.OrderState = newState;
				_dbContext.Orders.Update(order);
				await _dbContext.SaveChangesAsync();
				return true;
			}
			return false;
		}

		// Cập nhật phương thức thanh toán của đơn hàng
		public async Task<bool> UpdatePaymentMethodAsync(int orderId, string paymentMethod)
		{
			var order = await _dbContext.Orders.FindAsync(orderId);
			if (order != null)
			{
				order.PaymentMethod = paymentMethod;
				_dbContext.Orders.Update(order);
				await _dbContext.SaveChangesAsync();
				return true;
			}
			return false;
		}

		public async Task<Order> CreateOrder(Order order)
		{
			await dbContext.Orders.AddAsync(order);
			await dbContext.SaveChangesAsync();
			return order;
		}

		public async Task<List<Order>> GetOrdersByUserId(string userId)
		{
			return await dbContext.Orders
				.Where(o => o.UserId == userId)
				.Include(o => o.OrderDetails)
				.ThenInclude(oi => oi.Item)
				.ToListAsync();
		}

		public async Task AddOrderDetailAsync(OrderDetail orderDetail)
		{
			// Add the OrderDetail to the OrderDetails DbSet
			dbContext.OrderDetails.Add(orderDetail);

			// Save changes asynchronously
			await dbContext.SaveChangesAsync();
		}
	}
}
