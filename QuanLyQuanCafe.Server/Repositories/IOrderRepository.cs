using System.Collections.Generic;
using System.Threading.Tasks;
using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IOrderRepository : ICoffeeManagementRepository<Order>
    {

        // Lấy danh sách chi tiết đơn hàng theo OrderId
        Task<IEnumerable<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId);

        // Lấy danh sách đơn hàng theo UserId
        Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId);

        // Cập nhật trạng thái đơn hàng
        Task<bool> UpdateOrderStateAsync(int orderId, string newState);

        // Cập nhật phương thức thanh toán cho một Order
        Task<bool> UpdatePaymentMethodAsync(int orderId, string paymentMethod);

        // Cập nhật ghi chú hoặc điều chỉnh cho một OrderDetail
        Task<bool> UpdateNotesOrAdjustmentsAsync(int orderDetailId, string? notes, string? adjustments);

        // Xóa tất chi tiết đơn hàng theo OrderId
        Task<bool> DeleteOrderDetailsByOrderIdAsync(int orderId);
    }
}
