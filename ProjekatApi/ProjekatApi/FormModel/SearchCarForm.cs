using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace ProjekatApi.FormModel
{
    public class SearchCarForm
    {
        [Required]
        public string Kategorija { get; set; }
        [Required]
        public string Search { get; set; }

        public string IdComp { get; set; }
    }
}
