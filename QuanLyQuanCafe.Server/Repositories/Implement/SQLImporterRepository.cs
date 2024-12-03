using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLImporterRepository : CoffeeManagementRepository<Importer>, IImporterRepository
    {
        public SQLImporterRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
