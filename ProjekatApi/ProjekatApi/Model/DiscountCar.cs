using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class DiscountCar
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public DateTime StartDay { get; set; }
        public DateTime EndDay { get; set; }
        public float Cena { get; set; }
        public int Procenat { get; set; }
        public int NovaCena { get; set; }
        public string carId { get; set; }
    }
}
