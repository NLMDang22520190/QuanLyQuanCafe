using QuanLyQuanCafe.Server.Models;
using System.Linq.Expressions;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IIngredientRepository : ICoffeeManagementRepository<Ingredient>
    {
       
        Task<Ingredient>InscreaseQuantityAsync(int ingredientId, int  quantity);
        Task<List<Ingredient>> DecreaseQuantityAsync(int menuItemId);

        Task<bool> ExistsAsync(Expression<Func<Ingredient, bool>> predicate);

    }
}
