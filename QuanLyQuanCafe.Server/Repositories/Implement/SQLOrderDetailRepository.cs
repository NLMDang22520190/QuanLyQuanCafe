using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLOrderStatisticsRepository : IOrderStatisticsRepository
    {
        private readonly CoffeeManagementContext _dbContext;

        public SQLOrderStatisticsRepository(CoffeeManagementContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Lấy tổng số lượng món đã đặt theo ItemId
        public async Task<int> GetTotalQuantityOrderedByItemIdAsync(int itemId)
        {
            return await _dbContext.OrderDetails
                                   .Where(od => od.ItemId == itemId)
                                   .SumAsync(od => od.Quantity);
        }

        // Lấy số lần món đã được đặt theo ItemId
        public async Task<int> GetTotalTimesOrderedByItemIdAsync(int itemId)
        {
            return await _dbContext.OrderDetails
                                   .Where(od => od.ItemId == itemId)
                                   .CountAsync();
        }
    }
}
