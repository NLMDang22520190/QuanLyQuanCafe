using AutoMapper;
using QuanLyQuanCafe.Server.Models;
using QuanLyQuanCafe.Server.Models.DTO.GET;

namespace QuanLyQuanCafe.Server.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<MenuItem, FeatureMenuItem>().ReverseMap();
            CreateMap<MenuItem, ItemOnMenuPage>().ReverseMap();
        }
    }
}
