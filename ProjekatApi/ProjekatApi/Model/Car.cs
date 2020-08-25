using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class Car
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
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
        public string ImageCar { get; set; }
        public float AverageRating { get; set; }
        [JsonIgnore]
        public CarCompany CarCompany { get; set; }

    } 
}
