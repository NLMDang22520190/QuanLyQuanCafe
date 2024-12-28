namespace QuanLyQuanCafe.Server.Models.RequestModels
{
    public class CheckoutRequest
    {
        public string UserId { get; set; } = string.Empty;

        public int ShiftId { get; set; }

        public DateTime Checkin { get; set; }
        public DateTime Checkout { get; set; }

    }
}
