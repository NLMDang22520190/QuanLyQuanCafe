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
                                         on foodType.TypeOfFoodId equals menuItem.TypeOfFoodId into foodMenuGroup
                                         from menuItem in foodMenuGroup.DefaultIfEmpty()
                                         join itemRecipe in _dbContext.ItemRecipes
                                         on menuItem.ItemId equals itemRecipe.ItemId into menuItemRecipeGroup
                                         from itemRecipe in menuItemRecipeGroup.DefaultIfEmpty()
                                         group new { foodType, menuItem, itemRecipe } by new { foodType.TypeOfFoodId, foodType.TypeOfFoodName } into grouped
                                         select new FoodType
                                         {
                                             TypeOfFoodId = grouped.Key.TypeOfFoodId,
                                             TypeOfFoodName = grouped.Key.TypeOfFoodName,
                                            MenuItems = grouped.Where(g => g.menuItem != null).Select(g => new MenuItem
                                            {
                                                ItemId = g.menuItem.ItemId,
                                                ItemName = g.menuItem.ItemName,
                                                Price = g.menuItem.Price,
                                                Picture = g.menuItem.Picture,
                                                TypeOfFoodId = g.menuItem.TypeOfFoodId,
                                                ItemRecipes = grouped.Where(gr => gr.itemRecipe != null && gr.menuItem.ItemId == gr.itemRecipe.ItemId).Select(gr => gr.itemRecipe).Distinct().ToList()
                                            }).ToList()
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

