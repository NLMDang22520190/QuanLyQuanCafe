using Microsoft.AspNetCore.Identity;
using QuanLyQuanCafe.Server.Models;
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

        Task<ApplicationUser> GetUserByEmail(string email);
    }
}
