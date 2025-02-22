using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Acme.InterViewTask.DTOs;
using Acme.InterViewTask.Entities;
using Acme.InterViewTask.EntityFrameworkCore;
using Acme.InterViewTask.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Acme.InterViewTask.CartProductsRepo
{
    public class ProductCartRepo : ApplicationService, IProductCart
    {
        private readonly InterViewTaskDbContext db;
        private readonly IMapper mapper;

        public ProductCartRepo(InterViewTaskDbContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
       
    }
}
