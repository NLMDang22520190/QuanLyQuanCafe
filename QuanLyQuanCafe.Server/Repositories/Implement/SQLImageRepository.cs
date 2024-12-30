using QuanLyQuanCafe.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLImageRepository : CoffeeManagementRepository<Image>, IImageRepository
    {
        private readonly CoffeeManagementContext _dbContext;
        public SQLImageRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            this._dbContext = dbContext;
        }

        public Task<List<Image>> GetImagesByIdsAsync(List<int> imageIds) {
            return _dbContext.Images.Where(i => imageIds.Contains(i.ImageId)).ToListAsync();
        }
            
    }
}
