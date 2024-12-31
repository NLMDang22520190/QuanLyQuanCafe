using AutoMapper;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO;
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
            CreateMap<MenuItem, AddItemRequestDTO>().ReverseMap();
            CreateMap<ItemRecipe, AddItemRecipeRequestDTO>().ReverseMap();
            CreateMap<ItemRecipe, ItemRecipeDTO>().ReverseMap();
            CreateMap<MenuItem, MenuItemInRecipeDTO>().ReverseMap();
            CreateMap<Ingredient, IngredientInRecipeDTO>().ReverseMap();
            CreateMap<ItemRecipe, UpdateItemRecipeRequestDTO>().ReverseMap();
            CreateMap<MenuItem, UpdateItemRequestDTO>().ReverseMap();
            CreateMap<ApplicationUser, UserInfoDTO>().ReverseMap();
            CreateMap<ApplicationUser, UpdateUserInfoRequestDTO>().ReverseMap();
            CreateMap<Order, AddOrderRequestDTO>().ReverseMap();
            CreateMap<OrderDetail, AddOrderDetailRequestDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>()
           .ForMember(dest => dest.VoucherApplied, opt => opt.Ignore());

            CreateMap<OrderDetail, OrderDetailDTO>()
                .ForMember(dest => dest.ItemName, opt => opt.MapFrom(src => src.Item.ItemName))
                .ForMember(dest => dest.ItemPrice, opt => opt.MapFrom(src => src.Item.Price))
                .ReverseMap();

            CreateMap<VoucherDetail, VoucherDTO>().ReverseMap();
        }
    }
}
