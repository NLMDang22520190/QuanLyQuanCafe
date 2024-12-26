using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Models.RequestModels;
using QuanLyQuanCafe.Server.Repositories;
using QuanLyQuanCafe.Server.Services;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController(IUserRepository userRepository,IOrderRepository orderRepository, IMemoryCache cache) : ControllerBase
    {
        private readonly IUserRepository userRepository = userRepository;
        private readonly IOrderRepository orderRepository = orderRepository;
        private readonly IMemoryCache _cache = cache;
        private readonly EmailService _emailService = new EmailService();

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


        [HttpPost("send-verification-code/{email}")]
        public async Task<IActionResult> SendVerificationCode(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest(new
                {
                    status = "error",
                    message = "Email không được để trống."
                });
            }

            try
            {
                var code = await _emailService.SendVerificationCodeAsync(email);
                cache.Set(email, code, TimeSpan.FromMinutes(5));

                return Ok(new
                {
                    status = "success",
                    message = "Mã xác nhận đã được gửi đến email của bạn."
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new
                {
                    status = "error",
                    message = "Đã xảy ra lỗi khi gửi mã xác nhận.",
                    details = ex.Message // (tuỳ chọn)
                });
            }
        }

        [HttpPost("verify-code")]
        public IActionResult VerifyCode([FromBody] VerifyCodeRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Code))
            {
                return BadRequest(new
                {
                    status = "error",
                    message = "Email và mã xác nhận không được để trống."
                });
            }

            if (cache.TryGetValue(request.Email, out string storedCode))
            {
                if (storedCode == request.Code)
                {
                    cache.Remove(request.Email);
                    return Ok(new
                    {
                        status = "success",
                        message = "Mã xác nhận chính xác. Bạn có thể tiếp tục."
                    });
                }
                else
                {
                    return BadRequest(new
                    {
                        status = "error",
                        message = "Mã xác nhận không đúng. Vui lòng thử lại."
                    });
                }
            }

            return BadRequest(new
            {
                status = "expired",
                message = "Mã xác nhận đã hết hạn hoặc không tồn tại."
            });
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePasswordAsync([FromBody] ChangePasswordRequest request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest(new
                {
                    status = "error",
                    message = "Email và mật khẩu mới không được để trống."
                });
            }

            try
            {
                var userToChangePassword = await userRepository.GetUserByEmail(request.Email);

                if (userToChangePassword == null)
                {
                    return NotFound(new
                    {
                        status = "error",
                        message = "Không tìm thấy người dùng với email đã cung cấp."
                    });
                }

                var result =  await userRepository.UpdateUserPasswordAsync(userToChangePassword, request.NewPassword);

                if (!result)
                {
                    return BadRequest(new
                    {
                        status = "error",
                        message = "Đã xảy ra lỗi khi cập nhật mật khẩu."
                    });
                }

                return Ok(new
                {
                    status = "success",
                    message = "Đổi mật khẩu thành công."
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    status = "error",
                    message = ex.Message
                });
            }
        }

        [HttpGet("CheckEmailHasRegistered")]
        public async Task<bool> CheckEmailHasRegistered(string email)
        {
            var user = await userRepository.GetUserByEmail(email);
            if (user != null)
            {
                return true;
            }
            return false;
        }
    }
}
