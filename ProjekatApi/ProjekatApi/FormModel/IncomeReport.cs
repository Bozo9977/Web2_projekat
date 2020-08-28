using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class IncomeReport
    {
        public string IncomePerYear { get; set; }

        public string Year { get; set; }

        public string IncomePer3Month { get; set; }

        public string IncomePer6Month { get; set; }

        public string Month { get; set; }

        public string start3 { get; set; }

        public string end3 { get; set; }

        public string start6 { get; set; }

        public string end6 { get; set; }

        public string IncomePerMonth { get; set; }
    }
}
