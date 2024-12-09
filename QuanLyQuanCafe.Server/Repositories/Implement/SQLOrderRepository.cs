using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLOrderRepository : CoffeeManagementRepository<Order>, IOrderRepository
    {
        public SQLOrderRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }

        // Lấy danh sách chi tiết đơn hàng theo OrderId
        public async Task<IEnumerable<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            return await _dbContext.OrderDetails
                                   .Where(od => od.OrderId == orderId)
                                   .ToListAsync();
        }

        // Lấy danh sách đơn hàng theo UserId
        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
        {
            return await _dbContext.Orders
                                   .Where(o => o.CustomerId.ToString() == userId)
                                   .ToListAsync();
        }

        // Cập nhật trạng thái đơn hàng
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

        // Cập nhật phương thức thanh toán cho một Order
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

        // Cập nhật ghi chú hoặc điều chỉnh cho một OrderDetail
        public async Task<bool> UpdateNotesOrAdjustmentsAsync(int orderDetailId, string? notes, string? adjustments)
        {
            var orderDetail = await _dbContext.OrderDetails.FindAsync(orderDetailId);
            if (orderDetail != null)
            {
                orderDetail.Notes = notes;
                orderDetail.Adjustments = adjustments;
                _dbContext.OrderDetails.Update(orderDetail);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        // Xóa tất cả chi tiết đơn hàng theo OrderId
        public async Task<bool> DeleteOrderDetailsByOrderIdAsync(int orderId)
        {
            var orderDetails = await _dbContext.OrderDetails
                                                .Where(od => od.OrderId == orderId)
                                                .ToListAsync();
            if (orderDetails.Any())
            {
                _dbContext.OrderDetails.RemoveRange(orderDetails);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
