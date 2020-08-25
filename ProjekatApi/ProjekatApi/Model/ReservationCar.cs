using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class ReservationCar
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public DateTime Day1 { get; set; }
        public string City1 { get; set; }
        public DateTime Day2 { get; set; }
        public string City2 { get; set; }

        public string IdUser { get; set; }
        public string IdCar { get; set; }

    }
}
