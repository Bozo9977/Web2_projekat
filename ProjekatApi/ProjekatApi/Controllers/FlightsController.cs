using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjekatApi.Model;

namespace ProjekatApi.Controllers
{


    public class FlightTemp
    {
        public int Id { get; set; }
        public string Departure { get; set; }
        public string Arrival { get; set; }
        public DateTime TakeOff { get; set; }
        public DateTime TouchDown { get; set; }
        public int Length { get; set; }
        public List<string> Connections { get; set; }
        public double PriceFirst { get; set; }
        public int NumberFirst { get; set; }

        public double PriceBusiness { get; set; }
        public int NumberBusiness { get; set; }

        public double PriceEconomy { get; set; }
        public int NumberEconomy { get; set; }
    }


    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
        [HttpPost]
        [Route("AddFlight")]
        public async Task<IActionResult> AddFlight(FlightTemp flight)
        {
            //context.Destinations.Add(destination);

            //await context.SaveChangesAsync();

            string check = flight.Arrival;
            return Ok();
        }

        
    }
}