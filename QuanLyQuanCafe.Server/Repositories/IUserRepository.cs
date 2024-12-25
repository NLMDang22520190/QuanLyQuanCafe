using Microsoft.AspNetCore.Identity;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.RequestModels;

namespace QuanLyQuanCafe.Server.Repositories
{
    public interface IUserRepository 
    {
        public Task<IdentityResult> SignUpAsync(SignUpModel model);
        public Task<string> SignInAsync(SignInModel model);

    }
}
