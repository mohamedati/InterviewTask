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
    public interface ICart
    {
        Task CreateAsync(CreateUpdateCartDTO input);

        Task DeleteAsync(int id);





        Task UpdateAsync(int id, CreateUpdateCartDTO input);



        Task<int> GetCartProductsCount(string Email);
    }
    }
