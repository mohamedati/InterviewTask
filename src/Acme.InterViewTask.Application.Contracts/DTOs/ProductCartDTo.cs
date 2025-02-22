using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Acme.InterViewTask.Entities;

namespace Acme.InterViewTask.DTOs
{
    public class ProductCartDTo
    {
        public int CartId { get; set; }

        public int ProductId { get; set; }

        public int Quantity { get; set; }

        public string ProductName { get; set; } = null!;


        public decimal ProductPrice { get; set; } 

        public int ProductAvailableQuantity { get; set; } 

        public DateTime Date { get; set; }
    }
}
