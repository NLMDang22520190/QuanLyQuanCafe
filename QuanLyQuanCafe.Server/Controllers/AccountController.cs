using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.RequestModels;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(IUserRepository userRepository) : ControllerBase
    {
        private readonly IUserRepository userRepository = userRepository;

        [HttpPost("SignUp")]
        public async Task<IActionResult> SignUp(SignUpModel signUpModel)
        {
            var result = await userRepository.SignUpAsync(signUpModel);
            if (result.Succeeded)
            {
                return Ok(new ApiResponse<bool>
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Sign-up successful.",
                    Data = true
                });
            }

            return Unauthorized(new ApiResponse<bool>
            {
                StatusCode = StatusCodes.Status401Unauthorized,
                Message = "Sign-up failed.",
                Data = false
            });
        }

        [HttpPost("SignIn")]
        public async Task<IActionResult> SignIn(SignInModel signInModel)
        {
            var result = await userRepository.SignInAsync(signInModel);

            if (string.IsNullOrEmpty(result))
            {
                return Unauthorized(new ApiResponse<string>
                {
                    StatusCode = StatusCodes.Status401Unauthorized,
                    Message = "Invalid username or password.",
                   
                });
            }

            return Ok(new ApiResponse<string>
            {
                StatusCode = StatusCodes.Status200OK,
                Message = "Sign-in successful.",
                Data = "Sign-in succeeded.",
                JwtToken = result
            });
        }
    }
}
