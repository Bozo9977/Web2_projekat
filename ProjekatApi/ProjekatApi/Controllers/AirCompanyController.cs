using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

    }
}