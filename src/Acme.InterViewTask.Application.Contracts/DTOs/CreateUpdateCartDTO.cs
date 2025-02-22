using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services.Dto;

namespace Acme.InterViewTask.DTOs
{
    public class CreateUpdateCartDTO:EntityDto<int>
    {

        public DateTime LastAddDate { get; set; }
    }
}
