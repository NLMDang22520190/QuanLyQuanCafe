using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLIngredientRepository : CoffeeManagementRepository<Ingredient>, IIngredientRepository
    {
        public SQLIngredientRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
