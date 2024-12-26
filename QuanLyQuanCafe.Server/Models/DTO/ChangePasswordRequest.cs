using System.ComponentModel.DataAnnotations;

namespace QuanLyQuanCafe.Server.Models.DTO
{
    public class ChangePasswordRequest
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string NewPassword { get; set; }
    }
}
