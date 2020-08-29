using ProjekatApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class FlightSeatForm
    {
        public int Id { get; set; }
        public bool Reserved { get; set; }

        //dodati instancu Leta za koji je sediste vezano

        //dodati instancu usera koji je rezervisao sediste

        public double Price { get; set; }
        public Class Class { get; set; }
        public int Flight { get; set; }
    }
}
