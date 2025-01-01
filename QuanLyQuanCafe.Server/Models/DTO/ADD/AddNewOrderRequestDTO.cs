using QuanLyQuanCafe.Server.Models.DTO.GET;

namespace QuanLyQuanCafe.Server.Models.DTO.ADD
{
    public class AddNewOrderRequestDTO
    {

        public string? UserId { get; set; } = null!;

        public int? VoucherApplied { get; set; }

        public string PaymentMethod { get; set; } = null!;

        public string? FullName { get; set; } = null!;
        public string? PhoneNumber { get; set; } = null!;
        public string? Address { get; set; } = null!;

       // public virtual ICollection<OrderDetailDTO> OrderDetails { get; set; } = new List<OrderDetailDTO>();
    }
}
