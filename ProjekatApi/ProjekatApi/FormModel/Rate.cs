using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class Rate
    {
        public string id { get; set;}
        public DateTime startDay { get; set; }
        public DateTime endDay { get; set; }
        public string serviceName { get; set; }
        public string vehicle { get; set; }
        
    }
}
