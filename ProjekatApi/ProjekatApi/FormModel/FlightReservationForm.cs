using ProjekatApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class FlightReservationForm
    {
        public List<ApplicationUser> InvitedFriends { get; set; }
        public List<FlightSeatForm> Seats { get; set; }
        public string Passport { get; set; }
        public string User { get; set; }
        public int FlightId { get; set; }

        public FlightReservationForm()
        {
            InvitedFriends = new List<ApplicationUser>();
            Seats = new List<FlightSeatForm>();
        }
    }
}
