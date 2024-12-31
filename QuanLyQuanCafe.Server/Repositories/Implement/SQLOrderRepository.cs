using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
	public class SQLOrderRepository : CoffeeManagementRepository<Order>, IOrderRepository
	{
		private readonly CoffeeManagementContext _dbContext;
		private readonly IMapper _mapper;

		public SQLOrderRepository(CoffeeManagementContext dbContext, IMapper mapper) : base(dbContext)
		{
			_dbContext = dbContext;
			_mapper = mapper;	
		}

		public async Task<List<OrderDTO>> GetAllOrders()
		{
			var orders = await _dbContext.Orders

				.Include(o => o.OrderDetails)
				.ThenInclude(od => od.Item)
				.Include(o => o.User)
				.ToListAsync();

			var orderDTOs = _mapper.Map<List<OrderDTO>>(orders);
			orderDTOs.ForEach(o => 
			{
				if (o.VoucherApplied != null)
				{
					var voucherDetail = _dbContext.VoucherDetails.FirstOrDefault(v => v.VoucherId == o.VoucherApplied.VoucherId);
					o.VoucherApplied = voucherDetail?.VoucherId != null ? _mapper.Map<VoucherDTO>(voucherDetail) : null;
				}
			});

            return orderDTOs;
		}

		public async Task<Order?> GetOrderByIdAsync(int orderId)
		{
			return await _dbContext.Orders
								   .Include(o => o.OrderDetails)
								   .ThenInclude(od => od.Item)
								   .Include(o => o.User)
								   .FirstOrDefaultAsync(o => o.OrderId == orderId);
								   
		}

		public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(string userId)
		{
			return await _dbContext.Orders
								   .Where(o => o.UserId== userId)
								   .Include(o => o.User)
								   .ToListAsync();
		}


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
    
	public async Task<List<OrderStatisticDTO>> GetTotalOrderAmountByMonths()
        {
			var totalOrderAmountByMonth = await _dbContext.Orders
				.GroupBy(o => new { o.OrderTime.Year, Month = o.OrderTime.Month, Day = (o.OrderTime.Day - 1) / 5  })
				.Select(g => new OrderStatisticDTO
				{
					Day = $"{g.Key.Day + 1}",
					Month = $"{g.Key.Year}-{g.Key.Month}",
					TotalIncome = g.Sum(o => o.TotalPrice)
				})
				.ToListAsync();

            return totalOrderAmountByMonth;
        }

		public Task<List<Order>> GetPendingOrdersAsync()
        {
            var pendingOrders = _dbContext.Orders
				.Where(o => o.OrderState == "Pending")
				.ToListAsync();
			return pendingOrders;
        }

		public async Task<Order> CreateOrderAsync(Order order)
		 {
			var createdOrder = _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();

            foreach (var orderDetail in order.OrderDetails)
            {
                var item = await _dbContext.MenuItems
                    .Include(i => i.ItemRecipes)
                    .ThenInclude(ir => ir.Ingredient)
                    .FirstOrDefaultAsync(i => i.ItemId == orderDetail.ItemId);

                if (item != null)
                {
                    foreach (var itemRecipe in item.ItemRecipes)
                    {
                        var ingredient = itemRecipe.Ingredient;
                        ingredient.QuantityInStock -= itemRecipe.Quantity * orderDetail.Quantity;
                        _dbContext.Ingredients.Update(ingredient);
                    }
                }
            }

            await _dbContext.SaveChangesAsync();
            return createdOrder.Entity;
        }

    }

}
