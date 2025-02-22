using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Abp.UI.Inputs;
using Acme.InterViewTask.DTOs;
using Acme.InterViewTask.Entities;
using Acme.InterViewTask.EntityFrameworkCore;
using Acme.InterViewTask.Interfaces;
using AutoMapper;
using Elfie.Serialization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Data;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.Identity;

namespace Acme.InterViewTask.Repos
{
    public class ProductRepo :ApplicationService /*CrudAppService<Product, ProductDTO, int, PagedAndSortedResultRequestDto,CreateUpdateProductDTO>,*/ ,IProduct
    {
        //public ProductRepo(IRepository<Product, int> repository) : base(repository)
        //{

        //}

        private readonly InterViewTaskDbContext db;
        private readonly IMapper mapper;
       

        public ProductRepo(InterViewTaskDbContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;
            
        }

        
        public async Task<IEnumerable<ProductDTO>> GetAll()
        {
            var data = db.Products.AsNoTracking().ToList();
            return mapper.Map<IEnumerable<ProductDTO>>(data);
        }
        
        public async Task AddProductAsync(ProductDTO product)

        {
           
            var data= mapper.Map<Product>(product);

            await db.Products.AddAsync(data);
            await db.SaveChangesAsync();
        }
        public async Task UpdateProductAsync(ProductDTO product)

        {

            var data = mapper.Map<Product>(product);
            db.Entry(data).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
           
            await db.SaveChangesAsync();
        }


        public async Task DeleteProductAsync(int ID)

        {
            var data = await db.Products.FindAsync(ID);
             db.Products.Remove(data);
            await db.SaveChangesAsync();
        }
        public async Task<ProductDTO> GetProductByID(int ID)

        {
            var data = await db.Products.FindAsync(ID);
            var res=mapper.Map<ProductDTO>(data);
            return res;
        }

        public async Task<PagedResultDto<ProductDTO>> GetPaginatedList(GetProductList input)

        {
            if (input.SortBy.IsNullOrWhiteSpace())
            {
                input.SortBy = "ID";
            }
            var data = db.Products
                .Where(a => input.Search==null||a.Name.Contains(input.Search))
                .Skip((input.Page - 1) * input.Size)
                .Take(input.Size)
                .OrderBy(input.SortBy)
                
                .AsNoTracking();

         


            return new PagedResultDto<ProductDTO>
            {
                TotalCount = db.Products.Count(),
                Items = mapper.Map<List<ProductDTO>>(data)
            };

        }

        public async Task<IEnumerable<ProductCartDTo>> GetProductsOfCart(string Email)
        {
            var Cart = db.Carts.Where(A => A.User.Email == Email).FirstOrDefault();
            return await db.CartProducts.Where(a => a.CartId == Cart.Id)
                    .Include(a => a.Product)
                    .AsNoTracking()
                    .Select(a => new ProductCartDTo()
                    {
                        CartId = a.CartId,
                        ProductId=a.ProductId,
                        ProductName = a.Product.Name,
                        Date = a.Date,
                        Quantity = a.Quantity,
                        ProductAvailableQuantity=a.Product.QuantityInStock,
                        ProductPrice=a.Product.Price

                    })
                    .ToListAsync();

        }

        public async Task<int> AddProductToCart(string Email, int ProductID)
        {






            var cart = db.Carts
                .Include(a=>a.User)

                .Where(a => a.User.Email == Email).FirstOrDefault();

            var id = 0;


            if (cart is null)
            {
                var cartToAdd = new Cart
                {
                    LastAddDate = DateTime.Now,
                    User=db.Users.Where(a=>a.Email == Email).FirstOrDefault(),

                };
                db.Carts.Add(cartToAdd);



                await db.SaveChangesAsync();

                id = cartToAdd.Id;

            }
            else
            {
                id = cart.Id;
            }


            db.Users.Where(a => a.Email == Email).FirstOrDefault().SetProperty("CartID",id);

            await db.SaveChangesAsync();

            var data = db.CartProducts.Where(a => a.CartId == id && a.ProductId == ProductID).ToList();
            if (data.Count() > 0)
                return 0;


            await db.CartProducts.AddAsync(new CartProduct { CartId = id, ProductId = ProductID, Quantity = 1, Date = DateTime.Now });

            await db.SaveChangesAsync();



            return id;





        }

        public async Task UpadteProductinCart( List<ProductCartDTo> productCart)
        {
            var data = db.CartProducts.Where(a => a.CartId == productCart[0].CartId).ToList();
           
            if (data is  null)
                throw new Exception("Element Not Found");

            db.CartProducts.RemoveRange(data);
            var res = mapper.Map<IEnumerable<CartProduct>>(productCart);
            db.CartProducts.AddRange(res);
            await db.SaveChangesAsync();







        }
        public async Task DeleteProductFromCart(string Email, int ProductID)
        {
            var cart = db.Carts
           .Include(a => a.User)

           .Where(a => a.User.Email == Email).FirstOrDefault();
            var data = db.CartProducts.Where(a => a.CartId ==cart.Id  && a.ProductId == ProductID).ToList();
            if (data is  null)
                throw new Exception("Element Not Dound");


             db.CartProducts.RemoveRange(data);
            await db.SaveChangesAsync();







        }
        private static object GetPropertyValue(object obj, string propertyName)
        {
            return obj.GetType().GetProperty(propertyName, BindingFlags.Public | BindingFlags.Instance)?.GetValue(obj, null);
        }
    }
}
