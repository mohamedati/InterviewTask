using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Acme.InterViewTask.DTOs
{
    public class ProductDTO
    {
        public int ?Id { get; set; }

        [MaxLength(20,ErrorMessage ="name max Length is 20")]
        [Required(ErrorMessage ="Name Is Required")]
        public string Name { get; set; } = null!;



        [MaxLength(50, ErrorMessage = "Description max Length is 50")]
    
        public string Description { get; set; } = null!;



        [MaxLength(20, ErrorMessage = "Title max Length is 20")]
        [Required(ErrorMessage = "Name Is Required")]
        public string Title { get; set; } = null!;

        [Required(ErrorMessage ="Price Is Required")]
        [Range(1,long.MaxValue,ErrorMessage = "Min Price is 1")]
        public decimal Price { get; set; }

        [Required(ErrorMessage = "Quantity In Stock Is Required")]
    
        public int QuantityInStock { get; set; }
    }
}
