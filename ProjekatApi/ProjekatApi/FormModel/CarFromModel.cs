using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using DataAnnotationsExtensions;

namespace ProjekatApi.FormModel
{
    public class CarFromModel
    {
        public string Id { get; set; }
        [Required]
        public string Mark { get; set; }
        [Required, Max(2020), Min(2005)]
        public int YearProduction { get; set; }
        [Required]
        public string Fuel { get; set; }
        [Required]
        public string Gearshift { get; set; }
        [Required, Max(8), Min(2)]
        public int Seat { get; set; }
        [Required, Max(5), Min(2)]
        public int Door { get; set; }
        [Required]
        public string AirConditioning { get; set; }
        [Required, Max(8), Min(0)]
        public int Bags { get; set; }

        [Required]
        public int RentPerDay { get; set; }

        public string Price { get; set; }
    
        public string Rating { get; set; }
        [Required]
        public string ImageCar { get; set; }

        public int IdCompany { get; set; }
    }
}
