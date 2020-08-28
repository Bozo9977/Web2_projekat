using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ProjekatApi.FormModel;
using ProjekatApi.Model;

namespace ProjekatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirCompanyController : ControllerBase
    {
        private readonly DatabaseContext context;
        private readonly UserManager<ApplicationUser> userManager;

        public AirCompanyController(DatabaseContext _context, UserManager<ApplicationUser> _userManager)
        {
            context = _context;
            userManager = _userManager;
        }

        [HttpPost]
        [Route("AddAirCompany")]
        public async Task<IActionResult> AddAirCompany(CompanyRegister company)
         {
            Aircompany airCompanyPom = new Aircompany();
            airCompanyPom.Name = company.RegistrationNameService;
            airCompanyPom.Address = company.Address;
            airCompanyPom.Description = company.Description;
            airCompanyPom.Destinations = null;
            airCompanyPom.Flights = null;

            airCompanyPom.Administrator = await userManager.FindByNameAsync(company.Email);
            context.Aircompanies.Add(airCompanyPom);

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("GetAircompanies")]
        public async Task<ActionResult<IEnumerable<Aircompany>>> GetAircompanies()
        {
            return await context.Aircompanies.ToListAsync();
        }

        [HttpGet]
        [Route("GetAircompanyForUser/{UserID}")]
        public async Task<IActionResult> GetAircompanyForUser(string UserID)
        {
            Aircompany ret;
            if((ret = await context.Aircompanies.SingleOrDefaultAsync(x=>x.Administrator.Id == UserID)) != null)
            {
                return Ok(ret);
            }
            else
            {
                return NotFound("Aircompany for user not found.");
            }
            
        }

        [HttpGet]
        [Route("GetLuggageInfoForCompany/{id}")]
        public async Task<ActionResult<IEnumerable<FlightLuggage>>> GetLuggageInfoForCompany(int id)
        {
            return context.Luggages.Where(x => x.IdCompany == id).ToList();
        }

        [HttpPost]
        [Route("AddLuggage")]
        public async Task<IActionResult> AddLuggage(object luggage)
        {
            Luggage l = new Luggage();

            string objStr = luggage.ToString();
            string[] obj1 = objStr.Split(':');
            string[] obj2 = null;

            for (int i = 1; i<obj1.Count();  i += 2)
            {
                //obj2. (obj1[i].Split('\\'));
            }
             //= obj1.Split('\\');

            var tip = luggage.GetType();

            

            return Ok();
          
        }

    }
}