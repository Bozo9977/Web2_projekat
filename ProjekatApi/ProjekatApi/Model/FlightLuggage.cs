using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class FlightLuggage
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Required]
        public double CarryOnPrice { get; set; }
        [Required]
        public double DuffelPrice { get; set; }
        [Required]
        public int IdCompany { get; set; }
    }
}
