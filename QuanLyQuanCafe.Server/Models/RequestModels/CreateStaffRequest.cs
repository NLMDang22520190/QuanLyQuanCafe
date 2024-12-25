namespace QuanLyQuanCafe.Server.Models.RequestModels
{
    public class CreateStaffRequest
    {
        public string UserId { get; set; }
        public DateTime StartDate { get; set; }
        public decimal HourlyWage { get; set; }
    }
}
