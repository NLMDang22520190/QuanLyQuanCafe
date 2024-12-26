using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLVoucherDetailRepository : CoffeeManagementRepository<VoucherDetail>, IVoucherDetailRepository
    {
        private readonly CoffeeManagementContext dbContext;
        UserManager<ApplicationUser> userManager;

        public SQLVoucherDetailRepository(CoffeeManagementContext dbContext, UserManager<ApplicationUser> userManager) : base(dbContext)
        {
            this.dbContext = dbContext;
            this.userManager= userManager;
        }

        public async Task<VoucherDetail> GetVoucherDetailByVoucherCode(string voucherCode)
        {
            var voucherDetail = await dbContext.VoucherDetails.FirstOrDefaultAsync(x => x.VoucherCode == voucherCode);
            return voucherDetail;
        }

        public async Task<List<VoucherDetail>> GetVoucherDetailByCustomerId(string userId)
        {
            // Lấy thông tin khách hàng
            var customer = await userManager.FindByIdAsync(userId);

            if (customer == null)
            {
                // Nếu không tìm thấy khách hàng, trả về null
                return null;
            }

            // Lọc các voucher có điểm yêu cầu nhỏ hơn hoặc bằng điểm của khách hàng
            var voucherDetails = await dbContext.VoucherDetails
                .Where(v => v.PointsRequired <= customer.CustomerPoint)
                .ToListAsync();

            return voucherDetails;
        }
    }
}
