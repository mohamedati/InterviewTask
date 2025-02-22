using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Identity;

namespace Acme.InterViewTask.Entities
{
    public partial class AppUser :IdentityUser
    {

        public int CartID {  get; set; }

        [NotMapped]

        [ForeignKey(nameof(CartID))]
        public Cart Cart { get; set; } = null!;
    }
}
