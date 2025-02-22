using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Acme.InterViewTask.DTOs
{
    public class GetProductList
    {
        public int Size {  get; set; }

        public int Page {  get; set; }

        public string? SortBy { get; set; } = null!;

        public string? SortOrder {  get; set; } = null!;

        public string? Search {  get; set; } = null!;

    }
}
