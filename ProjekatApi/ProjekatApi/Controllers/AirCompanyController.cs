using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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

        public AirCompanyController(DatabaseContext _context)
        {
            context = _context;
        }

        [HttpPost]
        [Route("AddAirCompany")]
        public async Task<IActionResult> AddAirCompany(CompanyRegister company)
         {
            Aircompany airCompanyPom = new Aircompany();
            airCompanyPom.Name = company.RegistrationNameService;
            airCompanyPom.Description = null;
            airCompanyPom.Destinations = null;
            airCompanyPom.Flights = null;
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


    }
}