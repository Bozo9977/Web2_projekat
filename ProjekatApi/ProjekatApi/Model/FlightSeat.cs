using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public enum Class
    {
        FIRST,
        BUSINESS,
        ECONOMY
    }

    public class FlightSeat
    {
        [Key]
        public int Id { get; set; }
        public bool Reserved { get; set; }

        //dodati instancu Leta za koji je sediste vezano

        //dodati instancu usera koji je rezervisao sediste
        
        public double Price { get; set; }
        public Class Class { get; set; }
        public Flight Flight { get; set; }

    }
}
