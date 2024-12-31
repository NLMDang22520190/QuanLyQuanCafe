using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface ICartRepository : ICoffeeManagementRepository<Cart>
	{
		Task<List<Cart>> GetAllCarts();
		Task<Cart> GetCartByCustomerId(string userId);
		Task<Cart> GetCartById(int cartId);  // <-- Add this line to the interface
		Task AddItemToCart(string userId, int itemId, int quantity, string? notes = null, string? adjustments = null);
		Task EditCartItem(string userId, int cartDetailId, int quantity, string? notes = null, string? adjustments = null);
		Task ClearCart(string userId);
		Task RemoveItemFromCart(string userId, int itemId);
	}
}
