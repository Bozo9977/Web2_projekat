using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjekatApi.Model;

namespace ProjekatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly DatabaseContext context;

        public DestinationController(DatabaseContext _context)
        {
            context = _context;
        }

        [HttpPost]
        [Route("AddDestination")]
        public async Task<IActionResult> AddDestination(Destination destination)
        {
            context.Destinations.Add(destination);

            await context.SaveChangesAsync();

            return Ok();
        }
        

        [HttpGet]
        [Route("GetDestinations")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetDestinations()
        {
            return await context.Destinations.ToListAsync();
        }


        [HttpDelete]
        [Route("DeleteDestination/{id}")]
        public async Task<ActionResult<Destination>> DeleteDestination(int id)
        {
            var destinations = await context.Destinations.FindAsync(id);
            if(destinations == null)
            {
                return NotFound();
            }
            context.Destinations.Remove(destinations);
            await context.SaveChangesAsync();

            return destinations;
        }

        [HttpGet]
        [Route("GetDestinations/{id}")]
        public async Task<ActionResult<IEnumerable<Destination>>> GetDestinationsForCompany(int id)
        {
            return await context.Destinations.Where(d => d.Aircompany.Id.Equals(id)).ToListAsync();
            //return null;
        }


    }
}