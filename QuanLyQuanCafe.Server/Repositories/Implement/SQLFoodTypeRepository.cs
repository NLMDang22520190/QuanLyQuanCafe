using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLFoodTypeRepository : CoffeeManagementRepository<FoodType>, IFoodTypeRepository
    {
        public SQLFoodTypeRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}

