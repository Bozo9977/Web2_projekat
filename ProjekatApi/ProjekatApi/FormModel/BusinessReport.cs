using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class BusinessReport
    {
        public DateTime Today { get; set; }

        public string ratingPerDay { get; set; }

        public string ratingPerWeek { get; set; }

        public string ratingPerMonth { get; set; }
    }
}
