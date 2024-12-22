using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLCartDetailRepository : CoffeeManagementRepository<CartDetail>, ICartDetailRepository
    {
        private readonly CoffeeManagementContext dbContext;

        public SQLCartDetailRepository(CoffeeManagementContext dbContext) : base(dbContext)
        {
            this.dbContext = dbContext;
        }
        public Task<List<CartDetail>> GetCartDetailByCartId(int cartId)
        {
            var cartDetails = dbContext.CartDetails
                .Where(x => x.CartId == cartId)
                .ToListAsync();
            return cartDetails;
        }
    }
}

