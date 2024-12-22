using System.Linq.Expressions;
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
                .Include(cd => cd.Item)
                .Where(x => x.CartId == cartId)
                .ToListAsync();
            return cartDetails;
        }

        public async Task<bool> DeleteCartDetailByCartId(int cartDetailId)
        {

            // Tạo filter dựa trên CartDetailId
            Expression<Func<CartDetail, bool>> filter = cd => cd.CartDetailId == cartDetailId;

            var status = await DeleteAsync(filter);

            if(status == null)
            {
                return false;
            }

            return true;


            //// Tạo filter dựa trên CartDetailId
            //var cartDetail = await _dbSet.FirstOrDefaultAsync(cd => cd.CartDetailId == cartDetailId);

            //if (cartDetail == null)
            //{
            //    return false; // Không tìm thấy bản ghi
            //}

            //_dbSet.Remove(cartDetail);
            //await dbContext.SaveChangesAsync(); // Lưu thay đổi vào CSDL

            //return true; // Xóa thành công
        }

    }
}

