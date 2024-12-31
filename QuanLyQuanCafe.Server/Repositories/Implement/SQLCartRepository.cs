using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
	public class SQLCartRepository : CoffeeManagementRepository<Cart>, ICartRepository
	{
		private readonly CoffeeManagementContext dbContext;

		public SQLCartRepository(CoffeeManagementContext dbContext) : base(dbContext)
		{
			this.dbContext = dbContext;
		}

		// Implementation of GetAllCarts
		public async Task<List<Cart>> GetAllCarts()
		{
			return await dbContext.Carts
								   .Include(c => c.CartDetails)  // Include cart details
								   .ThenInclude(cd => cd.Item)  // Include item details
								   .ToListAsync();
		}

		// Method to get a cart by its ID
		public async Task<Cart> GetCartById(int cartId)
		{
			// Eager load CartDetails to avoid lazy loading issues
			var cart = await dbContext.Carts
									  .Include(c => c.CartDetails)
									  .ThenInclude(cd => cd.Item) // Include MenuItem details
									  .FirstOrDefaultAsync(x => x.CartId == cartId);

			return cart;
		}


		// Method to get the cart by customer ID
		public async Task<Cart> GetCartByCustomerId(string userId)
		{
			// Eager load CartDetails to avoid lazy loading issues
			var cart = await dbContext.Carts
									  .Include(c => c.CartDetails)
									  .ThenInclude(cd => cd.Item) // Include MenuItem details
									  .FirstOrDefaultAsync(x => x.UserId == userId);

			return cart;
		}

		// Method to add an item to the cart
		public async Task AddItemToCart(string userId, int itemId, int quantity, string? notes = null, string? adjustments = null)
		{
			var cart = await GetCartByCustomerId(userId);
			if (cart == null)
			{
				throw new ArgumentException("Cart not found for this user.");
			}

			var menuItem = await dbContext.MenuItems.FindAsync(itemId);
			if (menuItem == null)
			{
				throw new ArgumentException("Menu item not found.");
			}

			// Check if the item is already in the cart
			var cartDetail = cart.CartDetails.FirstOrDefault(cd => cd.ItemId == itemId);
			if (cartDetail != null)
			{
				// Update quantity if the item exists
				cartDetail.Quantity += quantity;
				cartDetail.Notes = notes ?? cartDetail.Notes;  // Preserve the previous note if not provided
				cartDetail.Adjustments = adjustments ?? cartDetail.Adjustments;  // Preserve adjustments if not provided
			}
			else
			{
				// Add a new CartDetail
				cart.CartDetails.Add(new CartDetail
				{
					CartId = cart.CartId,
					ItemId = itemId,
					Quantity = quantity,
					Notes = notes,
					Adjustments = adjustments,
					Item = menuItem  // Add the item details to the CartDetail
				});
			}

			// Update the LastUpdated timestamp
			cart.LastUpdated = DateTime.Now;

			// Save changes to the database
			await dbContext.SaveChangesAsync();
		}

		// Method to update an existing item in the cart
		public async Task EditCartItem(string userId, int cartDetailId, int quantity, string? notes = null, string? adjustments = null)
		{
			var cart = await GetCartByCustomerId(userId);
			if (cart == null)
			{
				throw new ArgumentException("Cart not found for this user.");
			}

			// Find the cart detail that needs to be updated
			var cartDetail = cart.CartDetails.FirstOrDefault(cd => cd.CartDetailId == cartDetailId);
			if (cartDetail == null)
			{
				throw new ArgumentException("Cart detail not found for this cart.");
			}

			// Update the cart detail fields
			cartDetail.Quantity = quantity;
			cartDetail.Notes = notes ?? cartDetail.Notes;  // Preserve the previous note if not provided
			cartDetail.Adjustments = adjustments ?? cartDetail.Adjustments;  // Preserve adjustments if not provided

			// Update the LastUpdated timestamp
			cart.LastUpdated = DateTime.Now;

			// Save changes to the database
			await dbContext.SaveChangesAsync();
		}

		// Clear the cart
		public async Task ClearCart(string userId)
		{
			var cart = await GetCartByCustomerId(userId);
			if (cart == null)
			{
				throw new ArgumentException("Cart not found for this user.");
			}

			dbContext.CartDetails.RemoveRange(cart.CartDetails);
			await dbContext.SaveChangesAsync();
		}

		// Additional method to remove an item from the cart
		public async Task RemoveItemFromCart(string userId, int itemId)
		{
			var cart = await GetCartByCustomerId(userId);
			if (cart == null)
			{
				throw new ArgumentException("Cart not found for this user.");
			}

			// Find the cart detail by itemId
			var cartDetail = cart.CartDetails.FirstOrDefault(cd => cd.ItemId == itemId);
			if (cartDetail != null)
			{
				dbContext.CartDetails.Remove(cartDetail);
				await dbContext.SaveChangesAsync();
			}
			else
			{
				throw new ArgumentException("Item not found in the cart.");
			}
		}
	}
}
