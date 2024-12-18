using System.Collections.Generic;
using System.Threading.Tasks;
using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface IOrderRepository : ICoffeeManagementRepository<Order>
	{
		Task<Order?> GetOrderByIdAsync(int orderId);
		Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
		Task<bool> UpdateOrderStateAsync(int orderId, string newState);
		Task<bool> UpdatePaymentMethodAsync(int orderId, string paymentMethod);
	}
}
