using System.Collections.Generic;
using System.Threading.Tasks;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IOrderRepository : ICoffeeManagementRepository<Order>
    {
        Task<List<OrderDTO>> GetAllOrders();
        Task<List<OrderStatisticDTO>> GetTotalOrderAmountByMonths();
        
        Task<Order?> GetOrderByIdAsync(int orderId);
        Task<List<Order>> GetPendingOrdersAsync();
		Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);
        Task<Order> CreateOrderAsync(Order order);
		Task<bool> UpdateOrderStateAsync(int orderId, string newState);
		Task<bool> UpdatePaymentMethodAsync(int orderId, string paymentMethod);
    }
}