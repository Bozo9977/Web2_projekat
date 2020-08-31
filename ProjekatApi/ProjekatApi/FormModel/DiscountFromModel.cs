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

    public class GetDiscountFromModel
    {
        public DateTime startDay { get; set; }

        public DateTime endDay { get; set; }
    }

    public class DiscaountCarsView
    {
        public string Id { get; set; }
        public string Mark { get; set; }
        public string YearProduction { get; set; }
        public string Fuel { get; set; }
        public string Gearshift { get; set; }
        public string Seat { get; set; }
        public string Door { get; set; }
        public string AirConditioning { get; set; }
        public string Bags { get; set; }
        public string RentPerDay { get; set; }
        public DateTime startDay { get; set; }
        public DateTime endDay { get; set; }
        public string Popust { get; set; }
    }
}
