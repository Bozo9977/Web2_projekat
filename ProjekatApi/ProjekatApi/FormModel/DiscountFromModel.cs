using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using DataAnnotationsExtensions;

namespace ProjekatApi.FormModel
{
    public class DiscountFromModel
    {
        [Required]
        public DateTime StartDay { get; set; }
        [Required]
        public DateTime EndDay { get; set; }
        [Required]
        public int Procenat { get; set; }
        public string IdCar { get; set; }
    }
}
