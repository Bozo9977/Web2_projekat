using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class Destination
    {
        [Key]
        public int Id { get; set; }
        
        public string City { get; set; }

        //dodati listu aviokompanije koje mogu operisati na ovoj poziciji, ili aviokomp koja je dodala ovu dest

        public ICollection<FlightDestination> FlightDestinations { get; set; }
    }
}
