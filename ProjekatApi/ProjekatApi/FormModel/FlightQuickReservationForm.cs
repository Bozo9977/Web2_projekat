using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class FlightQuickReservationForm
    {
        public List<FlightSeatForm> Seats { get; set; }
        public int Discount { get; set; }
        public int FlightId { get; set; }

        public FlightQuickReservationForm()
        {
            Seats = new List<FlightSeatForm>();
        }
    }
}
