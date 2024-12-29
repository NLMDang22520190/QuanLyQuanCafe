namespace QuanLyQuanCafe.Server.Models.DTO.GET
{
    public class UserInfoDTO
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string? District { get; set; }
        public string? City { get; set; }
        public string? PhotoUrl { get; set; }
        public string? Ward { get; set; }

        public int? CustomerPoint { get; set; }
    }
}
