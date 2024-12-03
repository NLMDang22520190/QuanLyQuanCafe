using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLItemRecipeRepository : CoffeeManagementRepository<ItemRecipe>, IItemRecipeRepository
    {
        public SQLItemRecipeRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
