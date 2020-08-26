﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient.Server;
using Microsoft.EntityFrameworkCore;
using ProjekatApi.FormModel;
using ProjekatApi.Model;

namespace ProjekatApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {

        private readonly DatabaseContext context;

        public FlightsController(DatabaseContext _context)
        {
            context = _context;
        }

        [HttpPost]
        [Route("AddFlight")]
        public async Task<IActionResult> AddFlight(FlightModel flight)
        {
            Aircompany aircomp =  context.Aircompanies.Include(x=>x.Flights).SingleOrDefault(x=>x.Id==flight.Aircompany);

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

            //await context.Flights.AddAsync(f);

            aircomp.Flights.Add(f);

            context.Aircompanies.Update(aircomp);

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


        
        [Route("ChangeFlight")]
        public async Task<IActionResult> ChangeFlight(FlightModel flight)
        {
            Flight f =  context.Flights.Include(x => x.Seats).Include(x => x.FlightDestinations).ThenInclude(x => x.Destination).SingleOrDefault(x => x.Id == flight.Id);

            foreach(var item in f.Seats)
            {
                context.FlightSeats.Remove(item);
            }
            //await context.Save

            f.Seats = new List<FlightSeat>();

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

            f.Length = flight.Length;
            f.Departure = flight.Departure;
            f.Arrival = flight.Arrival;
            f.TouchDown = flight.TouchDown;
            f.TakeOff = flight.TakeOff;

            foreach(var item in f.FlightDestinations)
            {
                context.FlightDestinations.Remove(item);                
            }

            for(int i =0; i< flight.Connections.Count; i++)
            {
                Destination dest = await context.Destinations.SingleOrDefaultAsync(d => d.City == flight.Connections[i]);
                await context.FlightDestinations.AddAsync(new FlightDestination()
                {
                    FlightId = f.Id,
                    DestinationId = dest.Id
                });
            }
            context.Flights.Update(f);

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("GetFlights")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlights()
        {
            return await context.Flights.ToListAsync();
        }


        [HttpGet]
        [Route("GetFlightsForCompany/{id}")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetFlightsForCompany(int id)
        {
            return context.Aircompanies.Include(x => x.Flights).SingleOrDefault(x => x.Id == id).Flights.ToList();
        }

        [HttpGet]
        [Route("GetFlight/{id}")]
        public async Task<ActionResult<FlightModel>> GetFlight(int id)
        {
            Flight flight = context.Flights.Include(x => x.Seats).Include(x => x.FlightDestinations).ThenInclude(x => x.Destination).SingleOrDefault(x => x.Id == id);

            FlightModel fTemp = new FlightModel();

            if (flight == null)
            {
                return NoContent();
            }
            else
            {
                fTemp.Id = flight.Id;
                fTemp.Departure = flight.Departure;
                fTemp.Arrival = flight.Arrival;
                fTemp.Connections = new List<string>();
                foreach (var item in flight.FlightDestinations)
                {
                    fTemp.Connections.Add(item.Destination.City);
                }
                fTemp.TouchDown = flight.TouchDown;
                fTemp.TakeOff = flight.TakeOff;
                fTemp.Length = flight.Length;
                fTemp.NumberBusiness = flight.Seats.Where(x => x.Class == Class.BUSINESS).Count();
                fTemp.NumberEconomy = flight.Seats.Where(x => x.Class == Class.ECONOMY).Count();
                fTemp.NumberFirst = flight.Seats.Where(x => x.Class == Class.FIRST).Count();
                fTemp.PriceBusiness = flight.Seats.FirstOrDefault(x => x.Class == Class.BUSINESS).Price;
                fTemp.PriceEconomy = flight.Seats.FirstOrDefault(x => x.Class == Class.ECONOMY).Price;
                fTemp.PriceFirst = flight.Seats.FirstOrDefault(x => x.Class == Class.FIRST).Price;
            }
            return fTemp;
        }
        
    }
}