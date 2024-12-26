using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLItemRecipeRepository : CoffeeManagementRepository<ItemRecipe>, IItemRecipeRepository
    {
        private readonly CoffeeManagementContext _dbContext;

        public SQLItemRecipeRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            this._dbContext = dbContext;
        }

        public Task<List<ItemRecipe>> GetAllAsync()
        {
            var itemRecipes = _dbContext.ItemRecipes
                .Include(ir => ir.Item)
                .Include(ir => ir.Ingredient)
                .ToListAsync();
            return itemRecipes;
        }

        public Task<List<ItemRecipe>> GetItemRecipeByItemId(int itemId)
        {
            var itemRecipes = _dbContext.ItemRecipes
                .Include(ir => ir.Item)
                .Include(ir => ir.Ingredient)
                .Where(x => x.ItemId == itemId)
                .ToListAsync();
            return itemRecipes;
        }

        public async Task<bool> DeleteItemRecipeByItemId(int itemId)
        {
            // Tạo filter dựa trên ItemId
            Expression<Func<ItemRecipe, bool>> filter = ir => ir.ItemId == itemId;
            var status = await DeleteAsync(filter);
            if (status == null)
            {
                return false;
            }
            return true;
        }
    }
}
