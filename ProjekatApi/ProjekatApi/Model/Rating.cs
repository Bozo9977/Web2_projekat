using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public enum ServiceType { Company, Car, Flight };
    public class Rating
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public string IdService { get; set; }

        public int Mark { get; set; }

        public ServiceType Descriminator { get; set; }
    }
}
