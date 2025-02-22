using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Acme.InterViewTask.Entities
{
    public class CartProduct
    {
        public int CartId { get; set; }

        public int ProductId { get; set; }

        public int Quantity {  get; set; }

        [ForeignKey("CartId")]
        public Cart Cart { get; set; } = null!;

        [ForeignKey("ProductId")]
        public Product Product { get; set; } = null!;
        public DateTime Date { get; set; }
    }
}
