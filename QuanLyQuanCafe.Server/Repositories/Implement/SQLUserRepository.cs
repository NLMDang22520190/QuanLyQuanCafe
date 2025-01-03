using System.Diagnostics;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using QuanLyQuanCafe.Server.Helpers;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Models.RequestModels;
using QuanLyQuanCafe.Server.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using AutoMapper;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;
using System.Text.RegularExpressions;

namespace QuanLyQuanCafe.Server.Repositories.Implement
{
    public class SQLUserRepository(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IConfiguration configuration, RoleManager<IdentityRole> roleManager, IMapper mapper, ILookupNormalizer lookupNormalizer) :  IUserRepository
    {
        private readonly UserManager<ApplicationUser> userManager = userManager;
        private readonly SignInManager<ApplicationUser> signInManager = signInManager;
        private readonly IConfiguration configuration = configuration;
        private readonly RoleManager<IdentityRole> roleManager = roleManager;
        private readonly IMapper _mapper = mapper;
        private readonly ILookupNormalizer _lookupNormalizer = lookupNormalizer;

        public async Task<string> SignInAsync(SignInModel model)
        {
            var user = await GetUserByEmail(model.Email);
            if (user == null )
            {
                return string.Empty;
            }
            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);
            if (!passwordValid)
            {
                return string.Empty;
            }
            if (!user.isActive)
            {
                return "Disable";
            }

                var authClaims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim("user-id", user.Id)
            };

            var userRoles = await userManager.GetRolesAsync(user);
            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role.ToString()));
                authClaims.Add(new Claim("role", role.ToString()));
            }

            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: configuration["JWT:ValidIssuer"],
                audience: configuration["JWT:ValidAudience"],
                expires: DateTime.Now.AddMinutes(20),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha512Signature)
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<IdentityResult> SignUpAsync(SignUpModel model)
        {
            var user = new ApplicationUser
            {
                Email = model.Email,
                UserName = Regex.Replace(model.Email.Split('@')[0], @"[^a-zA-Z0-9]", ""),
                isActive =true,
                CustomerPoint = 0,
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                if (!await roleManager.RoleExistsAsync(AppRole.Customer))
                {
                    await roleManager.CreateAsync(new IdentityRole(AppRole.Customer));
                }

                await userManager.AddToRoleAsync(user, AppRole.Customer);
                
            }
            return result;
        }
        public async Task<bool> ActivateAccountAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return false;

            user.isActive = true;
            var result = await userManager.UpdateAsync(user);

            return result.Succeeded;
        }

        public async Task<bool> DisableAccountAsync(string userId)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null) return false;

            user.isActive = false;
            
            var result = await userManager.UpdateAsync(user);

            return result.Succeeded;
        }


        public async Task<List<UserModel>> GetUsersAsync(int pageIndex, int pageSize)
        {

            var users = await userManager.Users
                                          .Skip((pageIndex - 1) * pageSize) 
                                          .Take(pageSize)                  
                                          .ToListAsync();

            var userWithRoles = new List<UserModel>();

            foreach (var user in users)
            {
                var roles = await userManager.GetRolesAsync(user); 
                var role = roles.FirstOrDefault();

                userWithRoles.Add(new UserModel
                {
                    Id = user.Id,
                    Email = user.Email,
                    UserName = user.UserName,
                    IsActive = user.isActive,
                    Role = role 
                });
            }

            return userWithRoles;
        }

        public Task<ApplicationUser> GetUserById(string userId)
        {
            var user = userManager.FindByIdAsync(userId);
            return user;
        }


        public Task<ApplicationUser> GetUserByEmail(string email)
        {
            var user = userManager.Users.FirstOrDefaultAsync(u => u.Email.ToUpper() == email.ToUpper());
            return user;
        }

        public async Task<bool> UpdateUserPasswordAsync(ApplicationUser user, string newPassword)
        {
           
            var result = await userManager.HasPasswordAsync(user);

            if (result)
            {
                var removeResult = await userManager.RemovePasswordAsync(user);
                if (!removeResult.Succeeded)
                {
                    return false;
                }
            }

            var addResult = await userManager.AddPasswordAsync(user, newPassword);
            if (!addResult.Succeeded)
            {
                return false;
            }

            return true;

        }


        public async Task<bool> UpdateUserInfo(string userId, UpdateUserInfoRequestDTO request)
        {
            var user = await userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return false;
            }

            user.FullName = request.FullName;
            user.City = request.City;
            user.District = request.District;
            user.Ward = request.Ward;
            user.PhotoUrl = request.PhotoUrl;
            user.PhoneNumber = request.PhoneNumber;
            try
            {
                var result = await userManager.UpdateAsync(user);
                return result.Succeeded;
            }
            catch (Exception e)
            {
                Debug.WriteLine("error:" + e.Message);
                return false;
            }
        
        }

        public async Task<bool> CheckUserCurrentPass(SignInModel model)
        {
            var user = await GetUserByEmail(model.Email);
            if (user == null)
            {
                return false;
            }
            var passwordValid = await userManager.CheckPasswordAsync(user, model.Password);
            return passwordValid;
        }
    }

}