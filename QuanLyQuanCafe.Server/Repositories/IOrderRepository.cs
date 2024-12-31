using System.Collections.Generic;
using System.Threading.Tasks;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface IOrderRepository : ICoffeeManagementRepository<Order>
	{
		// Lấy tất cả các đơn hàng
		Task<List<Order>> GetAllAsync();

		// Lấy tổng số tiền của các đơn hàng theo tháng
		Task<List<OrderStatisticDTO>> GetTotalOrderAmountByMonths();

		// Lấy chi tiết một đơn hàng theo ID
		Task<Order?> GetOrderByIdAsync(int orderId);

		// Lấy tất cả các đơn hàng với trạng thái "Pending"
		Task<List<Order>> GetPendingOrdersAsync();

		// Lấy tất cả các đơn hàng của một người dùng theo userId
		Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);

		// Thêm một đơn hàng mới
		Task<Order> AddAsync(Order order);

		// Cập nhật trạng thái của đơn hàng
		Task<bool> UpdateOrderStateAsync(int orderId, string newState);

		// Cập nhật phương thức thanh toán của đơn hàng
		Task<bool> UpdatePaymentMethodAsync(int orderId, string paymentMethod);

		Task<Order> CreateOrder(Order order);
		Task<List<Order>> GetOrdersByUserId(string userId);


	}
}
