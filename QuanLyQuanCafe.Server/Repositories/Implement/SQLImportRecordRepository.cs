using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLImportRecordRepository : CoffeeManagementRepository<ImportRecord>, IImportRecordRepository
    {
        public SQLImportRecordRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<ImportRecordStatisticDTO>> GetTotalImportPriceByMonths()
        {
            var totalImportPriceByMonth = await dbContext.ImportRecords
                .GroupBy(ir => new 
                { 
                    ir.DateImport.Year, 
                    ir.DateImport.Month, 
                    Day = (ir.DateImport.Day - 1) / 5 
                })
                .Select(g => new ImportRecordStatisticDTO
                {
                    Day = $"{g.Key.Day + 1}",
                    Month = $"{g.Key.Year}-{g.Key.Month}",
                    TotalImportPrice = g.Sum(ir => ir.ImportPrice)
                })
                .ToListAsync();
                

            return totalImportPriceByMonth;
        }
        
    }
}
