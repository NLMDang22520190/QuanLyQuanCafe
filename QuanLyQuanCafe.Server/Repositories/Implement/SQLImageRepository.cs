using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLImageRepository : CoffeeManagementRepository<Image>, IImageRepository
    {
        public SQLImageRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
