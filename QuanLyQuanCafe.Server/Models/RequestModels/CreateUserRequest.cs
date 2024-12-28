using System.ComponentModel.DataAnnotations;

namespace QuanLyQuanCafe.Server.Models.RequestModels
{
    public class CreateUserModel
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public int OrderId { get; set; } 
    }
}
