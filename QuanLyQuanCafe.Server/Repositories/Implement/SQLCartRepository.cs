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
			var cart = await dbContext.Carts
				.Include(c => c.CartDetails)
				.ThenInclude(cd => cd.Item)
				.FirstOrDefaultAsync(x => x.CartId == cartId);

			if (cart == null)
				throw new ArgumentException("Cart not found.");

			return cart;
		}

		// Method to get the cart by customer ID
		public async Task<Cart> GetCartByCustomerId(string userId)
		{
			var cart = await dbContext.Carts
				.Include(c => c.CartDetails)
				.ThenInclude(cd => cd.Item)
				.FirstOrDefaultAsync(x => x.UserId == userId);

			if (cart == null)
				throw new ArgumentException("Cart not found for this user.");

			return cart;
		}

        public async Task<bool> ClearCartByCustomerId(string userId)
        {
            var cart = await GetCartByUserIdAsync(userId);
            if (cart == null)
            {
                return false;
            }
			dbContext.CartDetails.RemoveRange(cart.CartDetails);
            await dbContext.SaveChangesAsync();
            return true;

        }

        // CreateCartForCustomer method implementation
		public async Task<Cart> CreateCartForCustomer(string userId)
		{
			// Create a new cart for the customer
			var newCart = new Cart
			{
				UserId = userId,
				CartDetails = new List<CartDetail>(),  // Initial empty cart details
				LastUpdated = DateTime.UtcNow
			};

			dbContext.Carts.Add(newCart);
			await dbContext.SaveChangesAsync();

			// Return the newly created cart
			return newCart;  // Ensure the return type matches Task<Cart>
		}

		// Method to add an item to the cart
		public async Task AddItemToCart(string userId, int itemId, int quantity, string? notes = null, string? adjustments = null)
		{
			var cart = await GetCartByCustomerId(userId);

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
				cartDetail.Notes = notes ?? cartDetail.Notes;
				cartDetail.Adjustments = adjustments ?? cartDetail.Adjustments;
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
					Item = menuItem // Add the item details to the CartDetail
				});
			}

			// Update the LastUpdated timestamp
			cart.LastUpdated = DateTime.UtcNow;

			// Save changes to the database
			await dbContext.SaveChangesAsync();
		}

		// Method to update an existing item in the cart
		public async Task<bool> EditCartItem(string userId, int cartDetailId, int quantity, string? notes, string? adjustments)
		{
			try
			{
				// Retrieve the cart detail from the database
				var cartDetail = await dbContext.CartDetails
					.FirstOrDefaultAsync(cd => cd.CartDetailId == cartDetailId);

				if (cartDetail == null)
				{
					return false; // Cart detail not found
				}

				// Update the fields
				cartDetail.Quantity = quantity;
				cartDetail.Notes = notes;
				cartDetail.Adjustments = adjustments;

				// Save changes to the database
				await dbContext.SaveChangesAsync();
				return true; // Return true if update is successful
			}
			catch (Exception ex)
			{
				// Log and handle error
				Console.WriteLine($"Error updating cart item: {ex.Message}");
				return false; // Return false if an error occurred
			}
		}


		// Clear the cart
		public async Task ClearCart(string userId)
		{
			var cart = await GetCartByCustomerId(userId);

			dbContext.CartDetails.RemoveRange(cart.CartDetails);
			await dbContext.SaveChangesAsync();
		}

		// Additional method to remove an item from the cart
		public async Task RemoveItemFromCart(string userId, int itemId)
		{
			var cart = await GetCartByCustomerId(userId);

			var cartDetail = cart.CartDetails.FirstOrDefault(cd => cd.ItemId == itemId);
			if (cartDetail == null)
			{
				throw new ArgumentException("Item not found in the cart.");
			}

			dbContext.CartDetails.Remove(cartDetail);
			await dbContext.SaveChangesAsync();
		}

		public async Task<Cart> GetCartByUserIdAsync(string userId)
		{
			return await dbContext.Carts
				.Include(c => c.CartDetails)
				.ThenInclude(cd => cd.Item)
				.FirstOrDefaultAsync(c => c.UserId == userId);
		}

		public async Task ClearCartAsync(Cart cart)
		{
			//dbContext.CartDetails.RemoveRange(cart.CartDetails);
			//dbContext.Carts.Remove(cart);
			//await dbContext.SaveChangesAsync();
		}
	}
}
