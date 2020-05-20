using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class Flight
    {
        [Key]
        public int Id { get; set; }
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public DateTime TakeOff { get; set; }
        public DateTime TouchDown { get; set; }
        public int Length { get; set; }
        public ICollection<Destination> Connections { get; set; }
        public double PriceFirst { get; set; }
        public int NumberFirst { get; set; }

        public double PriceBusiness { get; set; }
        public int NumberBusiness { get; set; }

        public double PriceEconomy { get; set; }
        public int NumberEconomy { get; set; }

        //dodati instancu aviokompanije
        //dodati kolekciju sedista?
    }
}
