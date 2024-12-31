using Microsoft.AspNetCore.Identity;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Models.RequestModels;
namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IUserRepository 
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel model);
        public Task<string> SignInAsync(SignInModel model);
        Task<bool> ActivateAccountAsync(string userId);

        Task<bool> DisableAccountAsync(string userId);
        Task<List<UserModel>> GetUsersAsync(int pageNumber, int pageSize);

        Task<ApplicationUser> GetUserById(string userId);

        Task<ApplicationUser> GetUserByEmail(string email);

        Task<bool> UpdateUserPasswordAsync(ApplicationUser user, string newPassword);

        Task<bool> UpdateUserInfo(string userId, UpdateUserInfoRequestDTO request);

        Task<bool> CheckUserCurrentPass(SignInModel model);
    }
}
