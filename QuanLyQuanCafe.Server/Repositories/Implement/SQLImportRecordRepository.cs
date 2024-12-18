using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLImportRecordRepository : CoffeeManagementRepository<ImportRecord>, IImportRecordRepository
    {
        public SQLImportRecordRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
