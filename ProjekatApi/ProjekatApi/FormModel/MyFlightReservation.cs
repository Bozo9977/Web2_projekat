using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class MyFlightReservation
    {
        public DateTime DepartureDate { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public int IdReservation { get; set; }
        public bool CanBeErased { get; set; }
    }
}
