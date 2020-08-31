using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class FlightQuickReservation
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public DateTime TakeOff { get; set; }
        public int SeatNo { get; set; }
        public Class Class { get; set; }
        public double Price { get; set; }
        public double Discount { get; set; }
        public bool Reserved { get; set; }
        public int FlightId { get; set; }
    }
}
