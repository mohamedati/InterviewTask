using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Acme.InterViewTask.DTOs;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;

namespace Acme.InterViewTask.Interfaces
{
    public  interface IProduct/*:ICrudAppService<ProductDTO,int,PagedAndSortedResultRequestDto, CreateUpdateProductDTO>*/
    {
         Task<IEnumerable<ProductDTO>> GetAll();
    }
}
