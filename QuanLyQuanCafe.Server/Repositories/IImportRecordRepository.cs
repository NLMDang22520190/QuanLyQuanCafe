using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IImportRecordRepository: ICoffeeManagementRepository<ImportRecord>
    {
        Task<List<ImportRecordStatisticDTO>> GetTotalImportPriceByMonths(); 
    }
}
