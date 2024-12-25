using QuanLyQuanCafe.Server.Models;


namespace QuanLyQuanCafe.Server.Repositories
{
    public interface ICartDetailRepository : ICoffeeManagementRepository<CartDetail>
    {
        Task<List<CartDetail>> GetCartDetailByCartId(int cartId);
        Task<bool> DeleteCartDetailByCartId(int cartDetailId);
    }
}
