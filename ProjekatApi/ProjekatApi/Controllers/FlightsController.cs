using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient.Server;
using Microsoft.EntityFrameworkCore;
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

        private readonly DatabaseContext context;
        private readonly IHttpContextAccessor httpContextAccessor;

        public FlightsController(DatabaseContext _context, IHttpContextAccessor _httpContextAccessor)
        {
            context = _context;
            httpContextAccessor = _httpContextAccessor;
        }

        [HttpPost]
        [Route("AddFlight")]
        public async Task<IActionResult> AddFlight(FlightTemp flight)
        {

            Flight f = new Flight()
            {
                Departure = flight.Departure,
                Arrival = flight.Arrival,
                TakeOff = flight.TakeOff,
                TouchDown = flight.TouchDown,
                Length = flight.Length,
                Seats = new List<FlightSeat>(),
                FlightDestinations = new List<FlightDestination>()
            };

            for (int i = 0; i < flight.NumberFirst; i++)
            {
                f.Seats.Add(new FlightSeat() { Class = Class.FIRST, Price = flight.PriceFirst, Reserved = false, Flight = f });

            }

            for (int i = 0; i < flight.NumberBusiness; i++)
            {
                f.Seats.Add(new FlightSeat() { Class = Class.BUSINESS, Price = flight.PriceBusiness, Reserved = false, Flight = f });
            }

            for (int i = 0; i < flight.NumberEconomy; i++)
            {
                f.Seats.Add(new FlightSeat() { Class = Class.ECONOMY, Price = flight.PriceEconomy, Reserved = false, Flight = f });
            }

            await context.Flights.AddAsync(f);

            await context.SaveChangesAsync();

            Flight flightAdded = context.Flights.OrderBy(x=>x.Id).Last();

            for (int i = 0; i < flight.Connections.Count; i++)
            {
                Destination dest = await context.Destinations.SingleOrDefaultAsync(d => d.City == flight.Connections[i]);
                await context.FlightDestinations.AddAsync(new FlightDestination() { 
                    FlightId = flightAdded.Id,
                    DestinationId = dest.Id
                });
            }

            
            await context.SaveChangesAsync();

            return Ok();
        }


        [HttpGet]
        [Route("GetFlights")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            return await context.Flights.Include(f =>f.Seats).Include(f=>f.FlightDestinations).ThenInclude(d=>d.Destination).ToListAsync();
        }

        
    }
}