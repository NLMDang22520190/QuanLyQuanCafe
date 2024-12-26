﻿using System.ComponentModel.DataAnnotations;

namespace QuanLyQuanCafe.Server.Models.RequestModels
{
    public class SignUpModel
    {
        [Required, EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}
