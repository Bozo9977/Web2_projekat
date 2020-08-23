using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class FilterCar
    {
       public string City1 { get; set; }
       public string City2 { get; set; }
       public string Mark { get; set; }
       public string Number { get; set; }
       public DateTime endDay { get; set; }
       public DateTime startDay { get; set; }
       public string IdCompany { get; set; }

    }
}
