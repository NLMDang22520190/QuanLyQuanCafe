using QuanLyQuanCafe.Server.Models;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IVoucherDetailRepository : ICoffeeManagementRepository<VoucherDetail>
    {
        Task<VoucherDetail> GetVoucherDetailByVoucherCode(string voucherCode);
        Task<List<VoucherDetail>> GetVoucherDetailByCustomerId(int customerId);
    }
}
