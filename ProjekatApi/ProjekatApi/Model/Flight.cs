using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
   public enum FlightTypes { ONEWAY, ROUNDTRIP};
    public class Flight
    {
        [Key]
        public int Id { get; set; }
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public DateTime TakeOff { get; set; }
        public DateTime TouchDown { get; set; }
        public int Length { get; set; }
        public ICollection<FlightDestination> FlightDestinations { get; set; }
        public int NumberOfConnections { get; set; }
        public float AverageRating { get; set; }

        public FlightTypes Tip { get; set; }

        public List<FlightSeat> Seats { get; set; }
    }
}
