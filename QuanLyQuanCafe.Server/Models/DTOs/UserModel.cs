﻿namespace QuanLyQuanCafe.Server.Models.DTOs
{
    public class UserModel
    {
        public string Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public string Role { get; set; } 
    }

}
