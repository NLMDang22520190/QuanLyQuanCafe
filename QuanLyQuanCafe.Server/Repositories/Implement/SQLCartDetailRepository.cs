using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
	public class SQLCartDetailRepository : CoffeeManagementRepository<CartDetail>, ICartDetailRepository
	{
		private readonly CoffeeManagementContext dbContext;

		public SQLCartDetailRepository(CoffeeManagementContext dbContext) : base(dbContext)
		{
			this.dbContext = dbContext;
		}

		// Get Cart Details by Cart ID
		public async Task<List<CartDetail>> GetCartDetailByCartId(int cartId)
		{
			try
			{
				return await dbContext.CartDetails
					.Where(cd => cd.CartId == cartId)
					.ToListAsync();
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error fetching cart details for CartId {cartId}: {ex.Message}");
				return new List<CartDetail>(); // Return empty list on error
			}
		}

		// CreateCartForCustomer
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
			return newCart; // Ensure it returns a Task<Cart>
		}

		// Get Cart Detail by Cart ID and Item ID
		public async Task<CartDetail> GetCartDetailByCartIdAndItemId(int cartId, int itemId)
		{
			try
			{
				return await dbContext.CartDetails
					.FirstOrDefaultAsync(cd => cd.CartId == cartId && cd.ItemId == itemId);
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error fetching cart detail for CartId {cartId} and ItemId {itemId}: {ex.Message}");
				return null; // Return null if an error occurs
			}
		}

		// Delete Cart Detail by Cart Detail ID
		public async Task<bool> DeleteCartDetailByCartId(int cartDetailId)
		{
			try
			{
				var cartDetail = await dbContext.CartDetails
					.FirstOrDefaultAsync(cd => cd.CartDetailId == cartDetailId);

				if (cartDetail == null)
				{
					Console.WriteLine($"Cart detail with ID {cartDetailId} not found.");
					return false; // Item not found, return false
				}

				dbContext.CartDetails.Remove(cartDetail);
				await dbContext.SaveChangesAsync();
				Console.WriteLine($"Cart detail with ID {cartDetailId} deleted successfully.");
				return true; // Successfully deleted
			}
			catch (Exception ex)
			{
				// Log the exception to help diagnose the issue
				Console.WriteLine($"Error deleting cart detail with ID {cartDetailId}: {ex.Message}");
				return false; // Return false if an error occurs
			}
		}

		public async Task UpdateCartDetail(CartDetail cartDetail)
		{
			try
			{
				// Find the existing CartDetail record by its ID
				var existingCartDetail = await dbContext.CartDetails
					.FirstOrDefaultAsync(cd => cd.CartDetailId == cartDetail.CartDetailId);

				if (existingCartDetail != null)
				{
					// Update the properties of the existing CartDetail with new values
					existingCartDetail.Quantity = cartDetail.Quantity;
					existingCartDetail.Notes = cartDetail.Notes;
					existingCartDetail.Adjustments = cartDetail.Adjustments;

					// Save changes to the database
					dbContext.CartDetails.Update(existingCartDetail);
					await dbContext.SaveChangesAsync();
					Console.WriteLine($"Cart detail with ID {cartDetail.CartDetailId} updated successfully.");
				}
				else
				{
					// If no existing CartDetail found, log the error
					Console.WriteLine($"Cart detail with ID {cartDetail.CartDetailId} not found.");
				}
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error updating cart detail with ID {cartDetail.CartDetailId}: {ex.Message}");
			}
		}



		// Add Cart Detail
		public async Task AddCartDetail(CartDetail cartDetail)
		{
			try
			{
				await dbContext.CartDetails.AddAsync(cartDetail);
				await dbContext.SaveChangesAsync();
				Console.WriteLine($"Cart detail with ItemId {cartDetail.ItemId} added successfully.");
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error adding cart detail: {ex.Message}");
			}
		}

		// Update Cart Detail
		public async Task UpdateCartDetaila(CartDetail cartDetail)
		{
			try
			{
				dbContext.CartDetails.Update(cartDetail); // Update the cart detail in the database
				await dbContext.SaveChangesAsync(); // Save changes to the database
				Console.WriteLine($"Cart detail with ID {cartDetail.CartDetailId} updated successfully.");
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error updating cart detail with ID {cartDetail.CartDetailId}: {ex.Message}");
			}
		}

		// Get Cart Detail by Cart Detail ID (new method)
		public async Task<CartDetail> GetCartDetail(int cartDetailId)
		{
			try
			{
				return await dbContext.CartDetails
					.FirstOrDefaultAsync(cd => cd.CartDetailId == cartDetailId);
			}
			catch (Exception ex)
			{
				Console.WriteLine($"Error fetching cart detail for CartDetailId {cartDetailId}: {ex.Message}");
				return null; // Return null if an error occurs
			}
		}


	}
}
