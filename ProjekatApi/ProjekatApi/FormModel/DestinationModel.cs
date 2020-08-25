using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class DestinationModel
    {
        public int Id { get; set; }

        [Required]
        public string City { get; set; }
        [Required]
        public int Aircompany { get; set; }

        //public ICollection<FlightDestination> FlightDestinations { get; set; }
    }
}
