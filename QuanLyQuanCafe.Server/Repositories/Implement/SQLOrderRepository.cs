using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLOrderRepository : CoffeeManagementRepository<Order>, IOrderRepository
    {
        public SQLOrderRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }

        Task<List<OrderStatisticDTO>> IOrderRepository.GetTotalOrderAmountByMonths()
        {
            var totalOrderAmountByMonth = dbContext.Orders
                .GroupBy(o => new { o.OrderTime.Year, o.OrderTime.Month })
                .Select(g => new OrderStatisticDTO
                {
                    Month = g.Key.Year + "-" + g.Key.Month,
                    TotalIncome = g.Sum(o => o.TotalPrice)
                })
                .ToListAsync();

            return totalOrderAmountByMonth;
        }
    }
}
