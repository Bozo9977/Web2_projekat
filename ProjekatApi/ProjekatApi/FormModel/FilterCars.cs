using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using DataAnnotationsExtensions;

namespace ProjekatApi.FormModel
{
    public class FilterCar
    {
        [Required]
        public string City1 { get; set; }
        [Required]
        public string City2 { get; set; }
        [Required]
        public string Mark { get; set; }
        [Required, Max(8), Min(2)]
        public int Number { get; set; }
        [Required]
        public DateTime endDay { get; set; }
        [Required]
        public DateTime startDay { get; set; }
       public string Id { get; set; }
       public string IdUser { get; set; }



    }
}
