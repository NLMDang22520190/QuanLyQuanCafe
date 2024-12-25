using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IFoodTypeRepository : ICoffeeManagementRepository<FoodType>
    {
      IQueryable<FoodType> GetAllWithMenuItems();
      IQueryable<FoodType> GetWithMenuItemsById(int id);
      IQueryable<Int32> CountMenuItemsById(int id);
    }
}
