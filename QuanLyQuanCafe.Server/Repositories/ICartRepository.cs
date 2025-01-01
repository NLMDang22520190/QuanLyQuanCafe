using QuanLyQuanCafe.Server.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuanLyQuanCafe.Server.Repositories
{
	public interface ICartRepository : ICoffeeManagementRepository<Cart>
	{
		Task<List<Cart>> GetAllCarts();
		Task<Cart> GetCartByCustomerId(string userId);

		Task<bool> ClearCartByCustomerId(string userId);

        Task<Cart> CreateCartForCustomer(string userId); // Method returns Task<Cart>
		Task<Cart> GetCartById(int cartId);
		Task AddItemToCart(string userId, int itemId, int quantity, string? notes = null, string? adjustments = null);
		Task<bool> EditCartItem(string userId, int cartDetailId, int quantity, string? notes, string? adjustments); 
		Task ClearCart(string userId);
		Task RemoveItemFromCart(string userId, int itemId);
		Task<Cart> GetCartByUserIdAsync(string userId);
		Task ClearCartAsync(Cart cart);

		
	}
}
