
using Microsoft.EntityFrameworkCore;
using NuGet.Packaging;

using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLMenuItemRepository : CoffeeManagementRepository<MenuItem>, IMenuItemRepository
    {
        private readonly CoffeeManagementContext _dbContext;

        public SQLMenuItemRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<MenuItem> GetLeastSoldMenuItems()
        {
            var leastSoldMenuItems = (
            from menuItem in _dbContext.MenuItems
            join orderDetail in _dbContext.OrderDetails on menuItem.ItemId equals orderDetail.ItemId into menuItemOrderDetails
            let totalQuantitySold = menuItemOrderDetails.Sum(od => od.Quantity)
            orderby totalQuantitySold ascending
            select new MenuItem
            {
                ItemId = menuItem.ItemId,
                ItemName = menuItem.ItemName,
                Price = menuItem.Price,
                Picture = menuItem.Picture,
                TypeOfFoodId = menuItem.TypeOfFoodId,
                TypeOfFood = menuItem.TypeOfFood,
                OrderDetails = menuItem.OrderDetails,
            }).Take(10).AsQueryable();
            return leastSoldMenuItems;
        }

        public IQueryable<MenuItem> GetMostSoldMenuItems()
        {
            var mostSoldMenuItems = (
            from menuItem in _dbContext.MenuItems
            join orderDetail in _dbContext.OrderDetails on menuItem.ItemId equals orderDetail.ItemId into menuItemOrderDetails
            let totalQuantitySold = menuItemOrderDetails.Sum(od => od.Quantity)
            orderby totalQuantitySold descending
            select new MenuItem
            {
                ItemId = menuItem.ItemId,
                ItemName = menuItem.ItemName,
                Price = menuItem.Price,
                Picture = menuItem.Picture,
                TypeOfFoodId = menuItem.TypeOfFoodId,
                TypeOfFood = menuItem.TypeOfFood,
                OrderDetails = menuItem.OrderDetails,
            }).Take(10).AsQueryable();
            return mostSoldMenuItems;
        }

		// Get all menu items
		public async Task<List<MenuItem>> GetAllMenuItemsAsync()
		{
			return await dbContext.MenuItems.ToListAsync();
		}

		// Get menu item by ID
		public async Task<MenuItem?> GetMenuItemByIdAsync(int ItemId)
		{
			return await dbContext.MenuItems.FirstOrDefaultAsync(x => x.ItemId == ItemId);
		}

		// Get menu items by category ID
		public Task<List<MenuItem>> GetMenuItemsByCategoryIdAsync(int categoryId)
		{
			var menuItems = dbContext.MenuItems
				.Where(x => x.TypeOfFoodId == categoryId)
				.ToListAsync();

			return menuItems;
		}

		// Get feature menu items (random 8 items)
		public async Task<List<MenuItem>> GetFeatureMenuItemAsync()
		{
			var randomMenuItems = await dbContext.MenuItems
				.OrderBy(x => Guid.NewGuid()) // Randomly order
				.Take(8) // Take 8 random menu items
				.ToListAsync();

			return randomMenuItems;
		}

        public Task<List<MenuItem>> GetAllWithRecipesAsync()
        {
            var 
        menuItemsWithRecipes = (
            from menuItem in _dbContext.MenuItems
            join recipe in _dbContext.ItemRecipes on menuItem.ItemId equals recipe.ItemId
            join ingredient in _dbContext.Ingredients on recipe.IngredientId equals ingredient.IngredientId
            select new MenuItem
            {
                ItemId = menuItem.ItemId,
                ItemName = menuItem.ItemName,
                Price = menuItem.Price,
                Picture = menuItem.Picture,
                TypeOfFoodId = menuItem.TypeOfFoodId,
                TypeOfFood = menuItem.TypeOfFood,
                OrderDetails = menuItem.OrderDetails,
                ItemRecipes = menuItem.ItemRecipes.Select(r => new ItemRecipe
                {
                    ItemId = r.ItemId,
                    IngredientId = r.IngredientId,
                    Quantity = r.Quantity,
                    Ingredient = new Ingredient
                    {
                        IngredientId = ingredient.IngredientId,
                        IngredientName = ingredient.IngredientName,
                        Unit = ingredient.Unit,
                    }
                }).ToList()
            }).ToListAsync();

        return menuItemsWithRecipes;
        }

        public Task<MenuItem?> GetMenuItemWithRecipesByIdAsync(int itemId)
        {
            var menuItemWithRecipes = (
            from menuItem in _dbContext.MenuItems
            join recipe in _dbContext.ItemRecipes on menuItem.ItemId equals recipe.ItemId
            join ingredient in _dbContext.Ingredients on recipe.IngredientId equals ingredient.IngredientId
            where menuItem.ItemId == itemId
            select new MenuItem
            {
                ItemId = menuItem.ItemId,
                ItemName = menuItem.ItemName,
                Price = menuItem.Price,
                Picture = menuItem.Picture,
                TypeOfFoodId = menuItem.TypeOfFoodId,
                TypeOfFood = menuItem.TypeOfFood,
                OrderDetails = menuItem.OrderDetails,
                ItemRecipes = menuItem.ItemRecipes.Select(r => new ItemRecipe
                {
                    ItemId = r.ItemId,
                    IngredientId = r.IngredientId,
                    Quantity = r.Quantity,
                    Ingredient = new Ingredient
                    {
                        IngredientId = ingredient.IngredientId,
                        IngredientName = ingredient.IngredientName,
                        Unit = ingredient.Unit,
                    }
                }).ToList()
            }).FirstOrDefaultAsync();

            return menuItemWithRecipes;
        }

        public Task<bool> CheckStockOfItemIngredientAsync(int itemId)
        {
            var itemRecipes = _dbContext.ItemRecipes.Where(r => r.ItemId == itemId).ToList();
            foreach (var itemRecipe in itemRecipes)
            {
                var ingredient = _dbContext.Ingredients.FirstOrDefault(i => i.IngredientId == itemRecipe.IngredientId);
                if (ingredient == null || ingredient.QuantityInStock < itemRecipe.Quantity)
                {
                    return Task.FromResult(false);
                }
            }
            return Task.FromResult(true);
        }

        public async Task<MenuItem> UpdateMenuItemAsync(MenuItem menuItem)
        {
            var existingMenuItem = await _dbContext.MenuItems
                .Include(mi => mi.ItemRecipes)
                .FirstOrDefaultAsync(mi => mi.ItemId == menuItem.ItemId);

            if (existingMenuItem != null)
            {
                // Remove old item recipes
                _dbContext.ItemRecipes.RemoveRange(existingMenuItem.ItemRecipes);

                // Update menu item properties
                existingMenuItem.ItemName = menuItem.ItemName;
                existingMenuItem.Price = menuItem.Price;
                existingMenuItem.Picture = menuItem.Picture;
                existingMenuItem.TypeOfFoodId = menuItem.TypeOfFoodId;
                existingMenuItem.TypeOfFood = menuItem.TypeOfFood;

                // Add new item recipes
                existingMenuItem.ItemRecipes = menuItem.ItemRecipes;

                // Save changes
                await _dbContext.SaveChangesAsync();
            }

            return existingMenuItem;
        }
    }
}
