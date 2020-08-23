using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi.Model
{

    public enum UserType { ADMIN, CAR_ADMIN, AIR_ADMIN, USER };
    public class ApplicationUser : IdentityUser
    {
        

        [Column(TypeName = "nvarchar(150)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(150)")]
        public string LastName { get; set; }

        [Column(TypeName = "nvarchar(150)")]
        public string City { get; set; }

        [AllowNull]
        public string Discriminator { get; set; }

        public ICollection<ReservationCar> ReservationCars { get; set; }
    }
}
