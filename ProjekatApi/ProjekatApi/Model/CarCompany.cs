using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class CarCompany : Company
    {
        public ICollection<Car> Cars { get; set; }

        public ICollection<BranchOffices> BranchOffices { get; set; }
    }
}
