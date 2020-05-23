using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.FormModel
{
    public class CompanyRegister
    {
        public string Company { get; set; }
        public string RegistrationNameService { get; set; }
        public string RegistrationEmail { get; set; }
        public string RegistrationFirstName { get; set; }
        public string RegistrationLastName { get; set; }

        public string RegistrationCity { get; set; }
        public string RegistrationPassword { get; set; }

    }
}
