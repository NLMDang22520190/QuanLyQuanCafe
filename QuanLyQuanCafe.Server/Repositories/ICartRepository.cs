using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface ICartRepository : ICoffeeManagementRepository<Cart>
    {
        Task<Cart> GetCartByUserId(int userId);
    }
}
