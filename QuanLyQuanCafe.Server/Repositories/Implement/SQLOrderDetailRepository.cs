using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;

public class SQLOrderDetailRepository : IOrderDetailRepository
{
	private readonly CoffeeManagementContext _context;

	public SQLOrderDetailRepository(CoffeeManagementContext context)
	{
		_context = context;
	}

	// Lấy tất cả chi tiết đơn hàng
	public async Task<List<OrderDetail>> GetAllAsync()
	{
		return await _context.OrderDetails.ToListAsync();
	}

	// Lấy tất cả chi tiết đơn hàng theo OrderId
	public async Task<List<OrderDetail>> GetOrderDetailsByOrderIdAsync(int orderId)
	{
		return await _context.OrderDetails
			.Where(od => od.OrderId == orderId)
			.ToListAsync();
	}

	// Lấy chi tiết đơn hàng theo orderDetailId
	public async Task<OrderDetail> GetByIdAsync(int orderDetailId)
	{
		try
		{
			var orderDetail = await _context.OrderDetails
				.FirstOrDefaultAsync(od => od.OrderDetailId == orderDetailId);

			if (orderDetail == null)
			{
				throw new KeyNotFoundException($"OrderDetail with ID {orderDetailId} not found.");
			}

			return orderDetail;
		}
		catch (Exception ex)
		{
			throw new Exception($"Error fetching OrderDetail by ID: {ex.Message}", ex);
		}
	}

	// Implement GetByIdAsync with filter expression as defined in the interface
	public async Task<OrderDetail> GetByIdAsync(Expression<Func<OrderDetail, bool>> filter)
	{
		try
		{
			var orderDetail = await _context.OrderDetails
				.FirstOrDefaultAsync(filter);

			if (orderDetail == null)
			{
				throw new KeyNotFoundException("No matching OrderDetail found.");
			}

			return orderDetail;
		}
		catch (Exception ex)
		{
			throw new Exception($"Error fetching OrderDetail: {ex.Message}", ex);
		}
	}

	// Lấy tổng số lượng sản phẩm đã đặt theo ItemId
	public async Task<int> GetTotalQuantityOrderedByItemIdAsync(int itemId)
	{
		return await _context.OrderDetails
			.Where(od => od.ItemId == itemId)
			.SumAsync(od => od.Quantity);
	}

	// Lấy số lần sản phẩm được đặt hàng theo ItemId
	public async Task<int> GetTotalTimesOrderedByItemIdAsync(int itemId)
	{
		return await _context.OrderDetails
			.Where(od => od.ItemId == itemId)
			.CountAsync();
	}

	// Cập nhật ghi chú hoặc điều chỉnh cho chi tiết đơn hàng
	public async Task<bool> UpdateNotesOrAdjustmentsAsync(int orderDetailId, UpdateOrderDetailRequest updateRequest)
	{
		var orderDetail = await _context.OrderDetails
			.FirstOrDefaultAsync(od => od.OrderDetailId == orderDetailId);

		if (orderDetail == null)
		{
			return false;
		}

		// Cập nhật thông tin
		orderDetail.Notes = updateRequest.Notes;
		orderDetail.Adjustments = updateRequest.Adjustments;

		await _context.SaveChangesAsync();
		return true;
	}

	// Thêm mới chi tiết đơn hàng
	public async Task AddAsync(OrderDetail orderDetail)
	{
		var existingOrderDetail = await _context.OrderDetails
			.FirstOrDefaultAsync(od => od.OrderDetailId == orderDetail.OrderDetailId);

		if (existingOrderDetail != null)
		{
			throw new InvalidOperationException("OrderDetail already exists.");
		}

		await _context.OrderDetails.AddAsync(orderDetail);
		await _context.SaveChangesAsync();
	}

	// Xóa chi tiết đơn hàng
	public async Task RemoveAsync(OrderDetail orderDetail)
	{
		var existingOrderDetail = await _context.OrderDetails
			.FirstOrDefaultAsync(od => od.OrderDetailId == orderDetail.OrderDetailId);

		if (existingOrderDetail == null)
		{
			throw new InvalidOperationException("OrderDetail not found.");
		}

		_context.OrderDetails.Remove(orderDetail);
		await _context.SaveChangesAsync();
	}

	// Phương thức lưu thay đổi
	public async Task SaveAsync()
	{
		await _context.SaveChangesAsync();
	}

	// Tạo mới chi tiết đơn hàng và trả về
	public async Task<OrderDetail> CreateAsync(OrderDetail orderDetail)
	{
		await _context.OrderDetails.AddAsync(orderDetail);
		await _context.SaveChangesAsync();
		return orderDetail;
	}

	// Cập nhật chi tiết đơn hàng
	public async Task<OrderDetail> UpdateAsync(Expression<Func<OrderDetail, bool>> filter, Action<OrderDetail> updateAction)
	{
		// Find the first order detail that matches the filter
		var orderDetail = await _context.OrderDetails
			.FirstOrDefaultAsync(filter);

		if (orderDetail == null)
		{
			return null; // Or throw an exception, depending on your design
		}

		// Apply the update action to the found order detail
		updateAction(orderDetail);

		// Save changes to the database
		await _context.SaveChangesAsync();

		// Return the updated OrderDetail
		return orderDetail;
	}

	// Xóa chi tiết đơn hàng theo filter
	public async Task<OrderDetail> DeleteAsync(Expression<Func<OrderDetail, bool>> filter)
	{
		var orderDetail = await _context.OrderDetails
			.FirstOrDefaultAsync(filter);

		if (orderDetail == null)
		{
			return null; // Or throw an exception depending on your design
		}

		// Remove the found order detail from the database
		_context.OrderDetails.Remove(orderDetail);

		// Save changes to the database
		await _context.SaveChangesAsync();

		return orderDetail;
	}

	// Implementation for UpdateAsync(int, UpdateOrderDetailRequest)
	public async Task<OrderDetail> UpdateAsync(int orderDetailId, UpdateOrderDetailRequest updateRequest)
	{
		// Find the order detail by the given orderDetailId
		var orderDetail = await _context.OrderDetails
			.FirstOrDefaultAsync(od => od.OrderDetailId == orderDetailId);

		if (orderDetail == null)
		{
			throw new KeyNotFoundException($"OrderDetail with ID {orderDetailId} not found.");
		}

		// Update fields
		orderDetail.Notes = updateRequest.Notes;
		orderDetail.Adjustments = updateRequest.Adjustments;
		// You can add more fields to be updated if necessary

		// Save changes
		await _context.SaveChangesAsync();

		return orderDetail; // Return updated OrderDetail
	}
}
