using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuanLyQuanCafe.Server.Models.DTOs;
using QuanLyQuanCafe.Server.Repositories;

namespace QuanLyQuanCafe.Server.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet("statistics")]
        public async Task<ActionResult<List<OrderStatisticDTO>>> GetOrderStatistics()
        {
            var orderSummaries = await _orderRepository.GetTotalOrderAmountByMonths();    
            return Ok(orderSummaries);
        }   
    }
}
