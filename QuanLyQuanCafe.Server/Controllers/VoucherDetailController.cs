using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/voucher-details")]
    [ApiController]
    public class VoucherDetailController : ControllerBase
    {
        private readonly IVoucherDetailRepository _voucherDetailRepo;

        public VoucherDetailController(IVoucherDetailRepository voucherDetailRepo)
        {
            _voucherDetailRepo = voucherDetailRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllVoucherDetails()
        {
            try
            {
                var voucherDetails = await _voucherDetailRepo.GetAllAsync();

                if (voucherDetails == null || !voucherDetails.Any())
                {
                    return NotFound("No voucher details found.");
                }
                return Ok(voucherDetails);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching voucher details." });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVoucherDetailById(int id)
        {
            try
            {
                var voucherDetail = await _voucherDetailRepo.GetByIdAsync(f => f.VoucherId == id);

                if (voucherDetail == null)
                {
                    return NotFound($"Voucher detail with ID {id} not found.");
                }
                return Ok(voucherDetail);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while fetching the voucher detail." });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateVoucherDetail([FromBody] VoucherDetail voucherDetail)
        {
            try
            {
                if (voucherDetail == null)
                {
                    return BadRequest("Voucher detail is null.");
                }

                await _voucherDetailRepo.CreateAsync(voucherDetail);
                return Ok("Voucher detail created successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while creating the voucher detail." });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVoucherDetail(int id, [FromBody] VoucherDetail voucherDetail)
        {
            try
            {
                if (voucherDetail == null)
                {
                    return BadRequest("Voucher detail is null.");
                }

                var existingVoucherDetail = await _voucherDetailRepo.GetByIdAsync(f => f.VoucherId == id);
                if (existingVoucherDetail == null)
                {
                    return NotFound($"Voucher detail with ID {id} not found.");
                }

                await _voucherDetailRepo.UpdateAsync(
                    v => v.VoucherId == id, 
                    v => {
                        v.VoucherName = voucherDetail.VoucherName;
                        v.VoucherCode = voucherDetail.VoucherCode;
                        v.PercentDiscount = voucherDetail.PercentDiscount;
                        v.VoucherStartDate = voucherDetail.VoucherStartDate;
                        v.VoucherEndDate = voucherDetail.VoucherEndDate;
                    }
                );
                return Ok("Voucher detail updated successfully.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = "An error occurred while updating the voucher detail." });
            }
        }
    }
}
