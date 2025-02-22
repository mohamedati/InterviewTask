using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace Acme.InterViewTask.DTOs
{
    public class CreateUpdateProductDTO:EntityDto<int>
    {
        public string Name { get; set; } = null!;




        public string Description { get; set; } = null!;




        public string Title { get; set; } = null!;


        public decimal Price { get; set; }

        public int QuantityInStock { get; set; }
    }
}
