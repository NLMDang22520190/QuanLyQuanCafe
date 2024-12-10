using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLFoodTypeRepository : CoffeeManagementRepository<FoodType>, IFoodTypeRepository
    {
        private readonly CoffeeManagementContext _dbContext;

        public SQLFoodTypeRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<FoodType> GetAllWithMenuItems()
        {
            var foodTypeWithMenuItems = (from foodType in _dbContext.FoodTypes
                                         join menuItem in _dbContext.MenuItems
                                         on foodType.TypeOfFoodId equals menuItem.TypeOfFoodId
                                         select new FoodType
                                         {
                                             TypeOfFoodId = foodType.TypeOfFoodId,
                                             TypeOfFoodName = foodType.TypeOfFoodName,
                                             MenuItems = foodType.MenuItems
                                         }).AsQueryable();
            return foodTypeWithMenuItems;

        }

        public IQueryable<FoodType> GetWithMenuItemsById(int id)
        {
            var foodTypeWithMenuItems = (from foodType in _dbContext.FoodTypes
                                         join menuItem in _dbContext.MenuItems
                                         on foodType.TypeOfFoodId equals menuItem.TypeOfFoodId
                                         where foodType.TypeOfFoodId == id
                                         select new FoodType
                                         {
                                             TypeOfFoodId = foodType.TypeOfFoodId,
                                             TypeOfFoodName = foodType.TypeOfFoodName,
                                             MenuItems = foodType.MenuItems
                                         }).AsQueryable();
            return foodTypeWithMenuItems;
        }
        public IQueryable<int> CountMenuItemsById(int id)
        {
            var countMenuItems = (from foodType in _dbContext.FoodTypes
                                  join menuItem in _dbContext.MenuItems
                                  on foodType.TypeOfFoodId equals menuItem.TypeOfFoodId
                                  where foodType.TypeOfFoodId == id
                                  select menuItem.ItemId).AsQueryable();
            return countMenuItems;
        }
    }
}

