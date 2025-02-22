using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Domain.Entities.Auditing;
using Volo.Abp.Identity;

namespace Acme.InterViewTask.Entities
{
    public class Cart:FullAuditedEntity<int>
    {
        //public int Id { get; set; }

        public DateTime LastAddDate { get; set; }

        public IdentityUser ?User { get; set; } = null!;

    }
}
