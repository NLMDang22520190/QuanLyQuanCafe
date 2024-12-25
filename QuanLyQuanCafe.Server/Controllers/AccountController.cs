using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Models.RequestModels;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(IUserRepository userRepository,IOrderRepository orderRepository) : ControllerBase
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IOrderRepository orderRepository = orderRepository;

        [HttpPost("create-user")]
        public async Task<IActionResult> CreateUser(CreateUserModel createUserModel )
        {
            var order =orderRepository.GetOrderByIdAsync(createUserModel.OrderId);
            if (order == null)
                return Unauthorized(new ApiResponse<bool> { 
                StatusCode = StatusCodes.Status401Unauthorized,
                Message = "Order isn't exist.",
                Data = false
            });
            var signUpModel = new SignUpModel
            {
                Email = createUserModel.Email,
                Password = "12345678",
            };
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
                Message = "Create failed.",
                Data = false
            });
        }

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
        [HttpPatch("disable/{userId}")]
        public async Task<IActionResult> Disable(string userId)
        {
            var result = await userRepository.DisableAccountAsync(userId);
            if (result)
            {
                return Ok(new ApiResponse<bool>
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "User disabled successfully.",
                    Data = true
                });
            }

            return BadRequest(new ApiResponse<bool>
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = "Failed to disable user.",
                Data = false
            });
        }

        [HttpPatch("active/{userId}")]
        public async Task<IActionResult> Active(string userId)
        {
            var result = await userRepository.ActivateAccountAsync(userId);
            if (result)
            {
                return Ok(new ApiResponse<bool>
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "User activated successfully.",
                    Data = true
                });
            }

            return BadRequest(new ApiResponse<bool>
            {
                StatusCode = StatusCodes.Status400BadRequest,
                Message = "Failed to activate user.",
                Data = false
            });
        }
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers(int pageIndex = 1, int pageSize = 10)
        {
            var users = await userRepository.GetUsersAsync(pageIndex, pageSize);

            if (users == null || !users.Any())
            {
                return NotFound(new ApiResponse<List<UserModel>>
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "No users found.",
                    Data = null
                });
            }

            return Ok(new ApiResponse<List<UserModel>>
            {
                StatusCode = StatusCodes.Status200OK,
                Message = "Users fetched successfully.",
                Data = users
            });
        }

    }
}
