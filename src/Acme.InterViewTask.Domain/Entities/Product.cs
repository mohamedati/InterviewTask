using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.InterViewTask.Entities
{
    public class Product /*: FullAuditedEntity<int>*/
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
 public int Id { get; set; }

        [StringLength(50)]
        public string Name { get; set; } = null!;



        [StringLength(50)]
        public string Description { get; set; } = null!;



        [StringLength(20)]
        public string Title { get; set; } = null!;


        public decimal Price { get; set; }

        public int QuantityInStock {  get; set; }
    }
}
