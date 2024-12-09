using System.Collections.Generic;
using System.Threading.Tasks;
using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IOrderRepository : ICoffeeManagementRepository<Order>
    {
        // Lấy tổng số lượng món đã đặt theo ItemId
        Task<int> GetTotalQuantityOrderedByItemIdAsync(int itemId);

        // Lấy số lần món đã được đặt theo ItemId
        Task<int> GetTotalTimesOrderedByItemIdAsync(int itemId);
    }
}
