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
        private readonly IImportRecordRepository _importRecordRepository;
        private readonly IStaffRepository _staffRepository;
        public ReportController(IOrderRepository orderRepository, IMonthSalaryRepository monthSalaryRepository, IImportRecordRepository importRecordRepository, IStaffRepository staffRepository)
        {
            _orderRepository = orderRepository;
            _monthSalaryRepository = monthSalaryRepository;
            _importRecordRepository = importRecordRepository;
            _staffRepository = staffRepository;
        }

        [HttpGet("sale-statistics")]
        public async Task<ActionResult> GetSaleStatistics()
        {
            var totalOrderAmountByMonths = await _orderRepository.GetTotalOrderAmountByMonths();
            var totalSalaryByMonths = await _monthSalaryRepository.GetTotalMonthSalariesByMonthsAsync();
            var totalImportRecordByMonths = await _importRecordRepository.GetTotalImportPriceByMonths();

            var saleFigures = totalOrderAmountByMonths
                .Select(orderAmount => new SaleFigureDTO    
                {
                    period = orderAmount.Month + '-' + orderAmount.Day,
                    TotalIncome = orderAmount.TotalIncome,
                    TotalExpense = totalSalaryByMonths.FirstOrDefault(salary => salary.Month == orderAmount.Month)?.TotalSalaryPayed ?? 0 + (totalImportRecordByMonths.FirstOrDefault(importRecord => importRecord.Month == orderAmount.Month)?.TotalImportPrice ?? 0),
                    TotalNetProfit = orderAmount.TotalIncome - (totalImportRecordByMonths.FirstOrDefault(importRecord => importRecord.Month == orderAmount.Month)?.TotalImportPrice ?? 0)
                })
                .Union(totalImportRecordByMonths
                    .Where(importRecord => !totalOrderAmountByMonths.Any(orderAmount => orderAmount.Month == importRecord.Month && orderAmount.Day == importRecord.Day))
                    .Select(importRecord => new SaleFigureDTO
                    {
                        period = importRecord.Month + '-' + importRecord.Day,
                        TotalIncome = 0,
                        TotalExpense = importRecord.TotalImportPrice + (totalSalaryByMonths.FirstOrDefault(salary => salary.Month == importRecord.Month)?.TotalSalaryPayed ?? 0),
                        TotalNetProfit = -importRecord.TotalImportPrice + (totalSalaryByMonths.FirstOrDefault(salary => salary.Month == importRecord.Month)?.TotalSalaryPayed ?? 0),
                    }))
                .Union(totalSalaryByMonths
                    .Where(salary => !totalOrderAmountByMonths.Any(orderAmount => orderAmount.Month == salary.Month && orderAmount.Day == salary.Day))
                    .Select(salary => new SaleFigureDTO
                    {
                        period = salary.Month + '-' + salary.Day,
                        TotalIncome = 0,
                        TotalExpense = salary.TotalSalaryPayed + (totalImportRecordByMonths.FirstOrDefault(importRecord => importRecord.Month == salary.Month)?.TotalImportPrice ?? 0),
                        TotalNetProfit = -salary.TotalSalaryPayed + (totalImportRecordByMonths.FirstOrDefault(importRecord => importRecord.Month == salary.Month)?.TotalImportPrice ?? 0),
                    })
                ).ToList();
            
            return Ok(saleFigures);
        }

        [HttpGet("sale-statistics-by-months")]
        public async Task<ActionResult> GetSaleStatisticsByMonths()
        {
            var totalOrderAmountByMonths = await _orderRepository.GetTotalOrderAmountByMonths();
            var totalSalaryByMonths = await _monthSalaryRepository.GetTotalMonthSalariesByMonthsAsync();
            var totalImportRecordByMonths = await _importRecordRepository.GetTotalImportPriceByMonths();

            var saleFigures = totalOrderAmountByMonths
            .Select(orderAmount => new SaleFigureDTO    
            {
                period = orderAmount.Month.ToString(),
                TotalIncome = orderAmount.TotalIncome,
                TotalExpense = totalSalaryByMonths.FirstOrDefault(salary => salary.Month == orderAmount.Month)?.TotalSalaryPayed ?? 0 + (totalImportRecordByMonths.FirstOrDefault(importRecord => importRecord.Month == orderAmount.Month)?.TotalImportPrice ?? 0),
                TotalNetProfit = orderAmount.TotalIncome - (totalImportRecordByMonths.FirstOrDefault(importRecord => importRecord.Month == orderAmount.Month)?.TotalImportPrice ?? 0)
            })
            .Union(totalImportRecordByMonths
                .Where(importRecord => !totalOrderAmountByMonths.Any(orderAmount => orderAmount.Month == importRecord.Month))
                .Select(importRecord => new SaleFigureDTO
                {
                period = importRecord.Month.ToString(),
                TotalIncome = 0,
                TotalExpense = importRecord.TotalImportPrice + (totalSalaryByMonths.FirstOrDefault(salary => salary.Month == importRecord.Month)?.TotalSalaryPayed ?? 0),
                TotalNetProfit = -importRecord.TotalImportPrice + (totalSalaryByMonths.FirstOrDefault(salary => salary.Month == importRecord.Month)?.TotalSalaryPayed ?? 0),
                }))
            .Union(totalSalaryByMonths
                .Where(salary => !totalOrderAmountByMonths.Any(orderAmount => orderAmount.Month == salary.Month))
                .Select(salary => new SaleFigureDTO
                {
                period = salary.Month.ToString(),
                TotalIncome = 0,
                TotalExpense = salary.TotalSalaryPayed + (totalImportRecordByMonths.FirstOrDefault(importRecord => importRecord.Month == salary.Month)?.TotalImportPrice ?? 0),
                TotalNetProfit = -salary.TotalSalaryPayed + (totalImportRecordByMonths.FirstOrDefault(importRecord => importRecord.Month == salary.Month)?.TotalImportPrice ?? 0),
                })
            ).ToList();
            
            return Ok(saleFigures);
        }

        [HttpGet("staffs")]
        public async Task<IActionResult> getNewestStaffs()
        {
            var staffs = await _staffRepository.GetNewestStaffAsync(5);
            if (staffs == null || !staffs.Any())
            {
                return NotFound("No employees found.");
            }
            return Ok(staffs);
        }
    }
}
