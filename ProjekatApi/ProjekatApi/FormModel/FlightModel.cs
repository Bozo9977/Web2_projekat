using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class FlightModel
    {
        public int Id { get; set; }
        [Required]
        public string Departure { get; set; }
        [Required]
        public string Arrival { get; set; }
        [Required]
        public DateTime TakeOff { get; set; }
        [Required]
        public DateTime TouchDown { get; set; }
        [Required]
        public int Length { get; set; }
        [Required]
        public List<string> Connections { get; set; }
        [Required]
        public double PriceFirst { get; set; }
        [Required]
        public int NumberFirst { get; set; }
        [Required]
        public double PriceBusiness { get; set; }
        [Required]
        public int NumberBusiness { get; set; }
        [Required]
        public double PriceEconomy { get; set; }
        [Required]
        public int NumberEconomy { get; set; }
        [Required]
        public int Aircompany { get; set; }
        [Required]
        public string Type { get; set; }
    }
}
