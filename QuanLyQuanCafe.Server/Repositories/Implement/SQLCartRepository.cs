using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLCartRepository : CoffeeManagementRepository<Cart>, ICartRepository
    {
        private readonly CoffeeManagementContext dbContext;

        public SQLCartRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Cart> GetCartByCustomerId(string userId)
        {
            var cart = await dbContext.Carts.FirstOrDefaultAsync(x => x.UserId == userId);
            return cart;
        }

    }
}

