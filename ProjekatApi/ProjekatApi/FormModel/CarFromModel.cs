using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class CarFromModel
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
        public string Status { get; set; }
        public string HourlyRent { get; set; }
        public string RentPerDay { get; set; }

        public string Price { get; set; }

        public string Rating { get; set; }
        public string ImageCar { get; set; }
        public int IdCompany { get; set; }
    }
}
