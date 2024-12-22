using AutoMapper;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.ADD;
using QuanLyQuanCafe.Server.Models.DTO.GET;
using QuanLyQuanCafe.Server.Models.DTO.UPDATE;

namespace QuanLyQuanCafe.Server.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<MenuItem, FeatureMenuItemDTO>().ReverseMap();
            CreateMap<MenuItem, ItemOnMenuPageDTO>().ReverseMap();
            CreateMap<CartDetail, CartItemDetailDTO>().ReverseMap();
            CreateMap<MenuItem, CartItemDTO>().ReverseMap();
            CreateMap<CartDetail, AddItemToCartRequestDTO>().ReverseMap();
            CreateMap<CartDetail, UpdateCartItemRequestDTO>().ReverseMap();
        }
    }
}
