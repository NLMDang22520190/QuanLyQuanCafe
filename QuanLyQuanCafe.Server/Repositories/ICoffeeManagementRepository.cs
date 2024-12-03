using System.Linq.Expressions;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface ICoffeeManagementRepository<T>
    {
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(Expression<Func<T, bool>> filter);
        Task<T> CreateAsync(T dbRecord);
        Task<T> UpdateAsync(Expression<Func<T, bool>> filter, Action<T> UpdateRecord);
        Task<T> DeleteAsync(Expression<Func<T, bool>> filter);
    }
}
