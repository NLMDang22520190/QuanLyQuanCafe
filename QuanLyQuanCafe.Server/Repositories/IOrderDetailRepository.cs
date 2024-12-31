using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using NPOI.SS.Formula.Functions;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface IOrderDetailRepository : ICoffeeManagementRepository<OrderDetail>
	{
		Task<List<OrderDetail>> GetAllAsync();
		Task<List<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId);
		Task<int> GetTotalQuantityOrderedByItemIdAsync(int itemId);
		Task<int> GetTotalTimesOrderedByItemIdAsync(int itemId);
		Task<bool> UpdateNotesOrAdjustmentsAsync(int orderDetailId, UpdateOrderDetailRequest updateRequest);
		Task AddAsync(OrderDetail orderDetail);
		Task RemoveAsync(OrderDetail orderDetail);
		Task SaveAsync();
		Task<OrderDetail> GetByIdAsync(int orderDetailId);
		Task<OrderDetail> UpdateAsync(int orderDetailId, UpdateOrderDetailRequest updateRequest);
		Task<OrderDetail> CreateAsync(OrderDetail orderDetail);
		Task<OrderDetail> DeleteAsync(Expression<Func<OrderDetail, bool>> filter);
	}

}
