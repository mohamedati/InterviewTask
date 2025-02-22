using Acme.InterViewTask.DTOs;
using Acme.InterViewTask.Entities;
using AutoMapper;

namespace Acme.InterViewTask;

public class InterViewTaskApplicationAutoMapperProfile : Profile
{
    public InterViewTaskApplicationAutoMapperProfile()
    {
        CreateMap<Product, ProductDTO>().ReverseMap();
        CreateMap<Cart, CartDTO>().ReverseMap();

        CreateMap<Product, CreateUpdateProductDTO>().ReverseMap();
        CreateMap<Cart, CreateUpdateCartDTO>().ReverseMap();
        CreateMap<CartProduct, ProductCartDTo>().ReverseMap();
    }
}
