using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class BusinessReport
    {
        public string Today { get; set; }

        public string StartDayOdWeek { get; set; }

        public string EndDayOdWeek { get; set; }
        public string Month { get; set; }

        public string ratingPerDay { get; set; }

        public string ratingPerWeek { get; set; }

        public string ratingPerMonth { get; set; }

        public string CarsCount { get; set; }
    }
}
