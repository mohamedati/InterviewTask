using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Acme.InterViewTask.DTOs;
using Acme.InterViewTask.Entities;
using Acme.InterViewTask.EntityFrameworkCore;
using Acme.InterViewTask.Interfaces;
using AutoMapper;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace Acme.InterViewTask.Repos
{
    public class CartRepo : ApplicationService, ICart
    {
        private readonly InterViewTaskDbContext db;
        private readonly IMapper mapper;

        public CartRepo(InterViewTaskDbContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
        }
        public async  Task CreateAsync(CreateUpdateCartDTO input)
        {
            var data = mapper.Map<Cart>(input);
            await db.Carts.AddAsync(data);
            await db.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            db.Carts.Remove(await db.Carts.FindAsync(id));
            await db.SaveChangesAsync();
        }

   

    

        public async Task UpdateAsync(int id, CreateUpdateCartDTO input)
        {
           var data=mapper.Map<Cart>(input);
            db.Entry(data).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
           await  db.SaveChangesAsync();
        }


        public async Task<int> GetCartProductsCount(string Email)
        {
           var data= db.Carts.Where(a => a.User.Email == Email).FirstOrDefault();
            if (data is null)
                return 0;
            return db.CartProducts.Where(a=>a.CartId==data.Id).Count();

        }
    }
}
