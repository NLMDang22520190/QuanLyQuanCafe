using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLUserRepository : CoffeeManagementRepository<User>, IUserRepository
    {
        public SQLUserRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
        }
    }
}
