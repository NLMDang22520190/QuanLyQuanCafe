using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VoucherController : ControllerBase
    {
        private readonly IVoucherDetailRepository _voucherDetailRepository;
        private readonly IMapper _mapper;

        public VoucherController(IVoucherDetailRepository voucherDetailRepository, IMapper mapper)
        {
            _voucherDetailRepository = voucherDetailRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllVouchers")]

        public async Task<IActionResult> GetAllVouchers()
        {
            var voucherDetailDomain = await _voucherDetailRepository.GetAllAsync();
            if (voucherDetailDomain == null)
            {
                return NotFound($"No vouchers found");
            }
            return Ok(voucherDetailDomain);
        }

        [HttpGet("GetVoucherByCode/{code}")] 

        public async Task<IActionResult> GetVoucherByCode(string code)
        {
            var voucherDetailDomain = await _voucherDetailRepository.GetVoucherDetailByVoucherCode(code);
            if (voucherDetailDomain == null)
            {
                return NotFound($"No voucher found for code {code}");
            }
            return Ok(voucherDetailDomain);
        }

        [HttpGet("GetVoucherByCustomerId/{customerId}")]

        public async Task<IActionResult> GetVoucherByCustomerId(string customerId)
        {
            var voucherDetailDomain = await _voucherDetailRepository.GetVoucherDetailByCustomerId(customerId);
            if (voucherDetailDomain == null)
            {
                return NotFound($"No voucher found for UserId {customerId}");
            }
            return Ok(voucherDetailDomain);
        }


    }
}
