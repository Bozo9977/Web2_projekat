using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class Aircompany: Company
    {
        public List<Flight> Flights { get; set; }
        public List<Destination> Destinations { get; set; }

    }
}
