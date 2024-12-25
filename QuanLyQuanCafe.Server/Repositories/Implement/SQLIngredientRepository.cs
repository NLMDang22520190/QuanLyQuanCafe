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
    }
}
