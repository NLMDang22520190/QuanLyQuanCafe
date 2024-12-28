namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class StaffDto
    {
        public int StaffId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string UserId { get; set; }

        public DateTime DateStartedWorking { get; set; }
        public DateTime DateEndWorking { get; set; }

    }
}
