using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLSalaryRepository : CoffeeManagementRepository<Salary>, ISalaryRepository
    {
        public SQLSalaryRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
