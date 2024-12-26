using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/reports")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMonthSalaryRepository _monthSalaryRepository;

        public ReportController(IOrderRepository orderRepository, IMonthSalaryRepository monthSalaryRepository)
        {
            _orderRepository = orderRepository;
            _monthSalaryRepository = monthSalaryRepository;
        }

        [HttpGet("sale-statistics")]
        public async Task<ActionResult> GetSaleStatistics()
        {
            var totalOrderAmountByMonths = await _orderRepository.GetTotalOrderAmountByMonths();
            var totalSalaryByMonths = await _monthSalaryRepository.GetTotalMonthSalariesByMonthsAsync();

            var saleFigures = totalOrderAmountByMonths
                .Select(orderAmount => new SaleFigureDTO    
                {
                    Month = orderAmount.Month,
                    TotalIncome = orderAmount.TotalIncome,
                    TotalExpense = totalSalaryByMonths.FirstOrDefault(salary => salary.Month == orderAmount.Month)?.TotalSalaryPayed ?? 0
                })
                .Union(totalSalaryByMonths
                    .Where(salary => !totalOrderAmountByMonths.Any(orderAmount => orderAmount.Month == salary.Month))
                    .Select(salary => new SaleFigureDTO
                    {
                        Month = salary.Month,
                        TotalIncome = 0,
                        TotalExpense = salary.TotalSalaryPayed
                    }))
                .ToList();
            
            return Ok(saleFigures);
        }
    }
}
