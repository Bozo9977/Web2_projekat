using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{
    public class User : ApplicationUser
    {
        public string Birthday { get; set; }
    }
}
