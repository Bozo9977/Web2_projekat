using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using DataAnnotationsExtensions;

namespace ProjekatApi.FormModel
{
    public class BranchOfficeForm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Address { get; set; }
        [Required, Min(6), Max(10)]
        public int Telephone { get; set; }
        public string Rating { get; set; }
        public int IdCompany { get; set; }
    }
}
