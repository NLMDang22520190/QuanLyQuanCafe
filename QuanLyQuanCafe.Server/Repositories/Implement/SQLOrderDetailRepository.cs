using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLOrderDetailRepository : CoffeeManagementRepository<OrderDetail>, IOrderDetailRepository
    {
        private readonly CoffeeManagementContext _dbContext;

        public SQLOrderDetailRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId)
        {
            return await _dbContext.OrderDetails
                                   .Where(od => od.OrderId == orderId)
                                   .ToListAsync();
        }

        public async Task<int> GetTotalQuantityOrderedByItemIdAsync(int itemId)
        {
            return await _dbContext.OrderDetails
                                   .Where(od => od.ItemId == itemId)
                                   .SumAsync(od => od.Quantity);
        }

        public async Task<int> GetTotalTimesOrderedByItemIdAsync(int itemId)
        {
            return await _dbContext.OrderDetails
                                   .Where(od => od.ItemId == itemId)
                                   .CountAsync();
        }

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