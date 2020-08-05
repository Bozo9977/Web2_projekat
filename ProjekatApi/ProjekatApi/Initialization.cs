
using Microsoft.AspNetCore.Identity;
using ProjekatApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjekatApi
{
    public class Initialization
    {
        

        public static void GenerateRoles(RoleManager<AspNetRoles> roleManager)
        {
           // if(!roleManager.RoleExistsAsync("RegisteredUser").Result)
            {
                AspNetRoles role = new AspNetRoles();
                role.Name = "RegisteredUser";
                
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("Administrator").Result)
            {
                AspNetRoles role = new AspNetRoles();
                role.Name = "Administrator";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
            if (!roleManager.RoleExistsAsync("AirlineAdministrator").Result)
            {
                AspNetRoles role = new AspNetRoles();
                role.Name = "AirlineAdministrator";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }

            if (!roleManager.RoleExistsAsync("CarAdministrator").Result)
            {
                AspNetRoles role = new AspNetRoles();
                role.Name = "CarAdministrator";
                IdentityResult roleResult = roleManager.CreateAsync(role).Result;
            }
        }

        public static void InitializeData(UserManager<ApplicationUser> userManager)
        {
            if(userManager.FindByNameAsync("ivana.bozic01@gmail.com").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.FirstName = "Ivana";
                user.LastName = "Bozic";
                user.City = "Novi Sad";
                user.UserName = "ivana.bozic01@gmail.com";
                user.Email = "ivana.bozic01@gmail.com";

                IdentityResult result = userManager.CreateAsync(user, "bozic").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "RegisteredUser").Wait();
                }
            }

            if (userManager.FindByNameAsync("bozidar.maric@gmail.com").Result == null)
            {
                ApplicationUser user = new ApplicationUser();
                user.FirstName = "Bozidar";
                user.LastName = "Maric";
                user.City = "Novi Sad";
                user.UserName = "bozidar.maric@gmail.com";
                user.Email = "bozidar.maric@gmail.com";

                IdentityResult result = userManager.CreateAsync(user, "maric").Result;

                if (result.Succeeded)
                {
                    userManager.AddToRoleAsync(user, "RegisteredUser").Wait();
                }
            }

        }
    }



}
