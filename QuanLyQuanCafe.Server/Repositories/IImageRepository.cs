using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IImageRepository : ICoffeeManagementRepository<Image>
    {
        Task<List<Image>> GetImagesByIdsAsync(List<int> imageIds);
    }
}

