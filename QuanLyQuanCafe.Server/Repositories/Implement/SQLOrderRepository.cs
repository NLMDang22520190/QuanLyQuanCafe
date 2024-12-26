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

		public async Task<Order?> GetOrderByIdAsync(int orderId)
		{
			return await _dbContext.Orders
								   .FirstOrDefaultAsync(o => o.OrderId == orderId);
		}

		public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
		{
			return await _dbContext.Orders
								   .Where(o => o.UserId== userId)
								   .ToListAsync();
		}


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
    
	public async Task<List<OrderStatisticDTO>> GetTotalOrderAmountByMonths()
        {
			var totalOrderAmountByMonth = await _dbContext.Orders
				.GroupBy(o => new { o.OrderTime.Year, Month = o.OrderTime.Month, Day = (o.OrderTime.Day - 1) / 5  })
				.Select(g => new OrderStatisticDTO
				{
					Day = $"{g.Key.Day + 1}",
					Month = $"{g.Key.Year}-{g.Key.Month}",
					TotalIncome = g.Sum(o => o.TotalPrice)
				})
				.ToListAsync();

            return totalOrderAmountByMonth;
        }

		public Task<List<Order>> GetPendingOrdersAsync()
        {
            var pendingOrders = _dbContext.Orders
				.Where(o => o.OrderState == "Pending")
				.ToListAsync();
			return pendingOrders;
        }
    }


}