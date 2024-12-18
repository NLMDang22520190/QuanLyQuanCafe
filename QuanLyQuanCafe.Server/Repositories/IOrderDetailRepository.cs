using System.Collections.Generic;
using System.Threading.Tasks;
using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface IOrderDetailRepository : ICoffeeManagementRepository<OrderDetail>
	{
		Task<IEnumerable<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId);
		Task<int> GetTotalQuantityOrderedByItemIdAsync(int itemId);
		Task<int> GetTotalTimesOrderedByItemIdAsync(int itemId);
		Task<bool> UpdateNotesOrAdjustmentsAsync(int orderDetailId, string? notes, string? adjustments);
		Task<bool> DeleteOrderDetailsByOrderIdAsync(int orderId);
	}
}
