using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Acme.InterViewTask.DTOs;
using Acme.InterViewTask.Entities;
using AutoMapper;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.InterViewTask.Interfaces
{
    public  interface IProduct/*:ICrudAppService<ProductDTO,int,PagedAndSortedResultRequestDto, CreateUpdateProductDTO>*/
    {
         Task<IEnumerable<ProductDTO>> GetAll();
        Task DeleteProductAsync(int ID);

        Task<ProductDTO> GetProductByID(int ID);


        Task<PagedResultDto<ProductDTO>> GetPaginatedList(GetProductList input);


        Task<IEnumerable<ProductCartDTo>> GetProductsOfCart(string Email);
      

        Task UpadteProductinCart(List<ProductCartDTo> productCart);
    
         Task DeleteProductFromCart(string Email, int ProductID);
     
    }
}
