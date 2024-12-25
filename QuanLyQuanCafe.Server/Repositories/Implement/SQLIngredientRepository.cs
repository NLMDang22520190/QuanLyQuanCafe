using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLIngredientRepository : CoffeeManagementRepository<Ingredient>, IIngredientRepository
    {
        private readonly CoffeeManagementContext _dbContext;
        public SQLIngredientRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Ingredient>> DecreaseQuantityAsync(int menuItemId)
        {
            
            var itemRecipes = await dbContext.ItemRecipes
                .Where(ir => ir.ItemId == menuItemId)
                .ToListAsync();

            if (itemRecipes == null || !itemRecipes.Any())
            {
                throw new KeyNotFoundException($"No ItemRecipes found for MenuItemId {menuItemId}.");
            }

          
            var updatedIngredients = new List<Ingredient>();

            foreach (var itemRecipe in itemRecipes)
            {
                
                var ingredient = await dbContext.Ingredients
                    .FirstOrDefaultAsync(i => i.IngredientId == itemRecipe.IngredientId);

                if (ingredient == null)
                {
                    throw new KeyNotFoundException($"Ingredient with ID {itemRecipe.IngredientId} not found.");
                }

             
                if (ingredient.QuantityInStock < itemRecipe.Quantity)
                {
                    throw new InvalidOperationException($"Insufficient stock for Ingredient ID {ingredient.IngredientId}. Required: {itemRecipe.Quantity}, Available: {ingredient.QuantityInStock}");
                }

             
                ingredient.QuantityInStock -= itemRecipe.Quantity;

          
                dbContext.Ingredients.Update(ingredient);

               
                updatedIngredients.Add(ingredient);
            }

            
            await dbContext.SaveChangesAsync();

           
            return updatedIngredients;
        }


        public async Task<Ingredient> InscreaseQuantityAsync(int ingredientId, int quantity)
        {
            
            var ingredient = await dbContext.Ingredients.FirstOrDefaultAsync(i => i.IngredientId == ingredientId);

            if (ingredient == null)
            {
                throw new KeyNotFoundException($"Ingredient with ID {ingredientId} not found.");
            }

     
            ingredient.QuantityInStock += quantity;

        
            dbContext.Ingredients.Update(ingredient);
            await dbContext.SaveChangesAsync();

        
            return ingredient;
        }

       
    }
}
