using System.Collections.Generic;
using System.Threading.Tasks;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface IOrderRepository : ICoffeeManagementRepository<Order>
	{
		Task<List<Order>> GetAllAsync();
		Task<List<OrderStatisticDTO>> GetTotalOrderAmountByMonths();
		Task<Order?> GetOrderByIdAsync(int orderId);
		Task<List<Order>> GetPendingOrdersAsync();
		Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);

		Task<List<Order>> GetOrderDetailsByUserIdAsync(string userId);

        Task<Order> AddAsync(Order order);
		Task<bool> UpdateOrderStateAsync(int orderId, string newState);
		Task<bool> UpdatePaymentMethodAsync(int orderId, string paymentMethod);
		Task<Order> CreateOrder(Order order);
		Task<List<Order>> GetOrdersByUserId(string userId);
		Task AddOrderDetailAsync(OrderDetail orderDetail);
	}
}
