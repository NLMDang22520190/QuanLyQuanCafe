using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IShiftRepository : ICoffeeManagementRepository<Shift>
    {
        IQueryable<ShiftTimeDistribution> GetShiftDistribution();
    }
}
