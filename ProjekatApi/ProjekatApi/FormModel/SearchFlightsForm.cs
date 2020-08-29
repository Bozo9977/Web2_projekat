using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class SearchFlightsForm
    {
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public string StartDay { get; set; }
        public string EndDay { get; set; }
        public string Type { get; set; }
        //public int Number { get; set; }
        public int Aircompany { get; set; }
    }
}
