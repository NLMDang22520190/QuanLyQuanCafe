using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface ICartDetailRepository : ICoffeeManagementRepository<CartDetail>
	{
		// Get Cart Details by Cart ID
		Task<List<CartDetail>> GetCartDetailByCartId(int cartId);

		// Get a specific Cart Detail by Cart ID and Item ID
		Task<CartDetail> GetCartDetailByCartIdAndItemId(int cartId, int itemId);

		// Delete Cart Detail by Cart Detail ID
		Task<bool> DeleteCartDetailByCartId(int cartDetailId);

		// Add a Cart Detail
		Task AddCartDetail(CartDetail cartDetail);

		// Update Cart Detail
		Task UpdateCartDetail(CartDetail cartDetail);

		// Get a Cart Detail by Cart Detail ID
		Task<CartDetail> GetCartDetail(int cartDetailId);  // Added GetCartDetail
	}
}
