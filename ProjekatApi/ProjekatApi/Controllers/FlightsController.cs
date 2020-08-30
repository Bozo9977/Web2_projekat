using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient.Server;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
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

            if (flight.Type == "Round trip")
            {
                f.Tip = FlightTypes.ROUNDTRIP;
            }
            else
            {
                f.Tip = FlightTypes.ONEWAY;
            }

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

            f.NumberOfConnections = f.FlightDestinations.Count();
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



        [HttpPost]
        [Route("SearchAvailableFlights")]
        public async Task<ActionResult<IEnumerable<Flight>>> SearchAvailableFlights(SearchCarForm searchCar)
        {
            List<Flight> nullList = new List<Flight>();
            var pom = context.Aircompanies.Include(x => x.Flights).SingleOrDefault(x => x.Id == Int32.Parse(searchCar.IdComp)).Flights.ToList();

            if (searchCar.Kategorija == "City of departure")

            {
                return pom.FindAll(x => x.Departure.ToLower() == searchCar.Search.ToLower());
            }
            else if (searchCar.Kategorija == "City of arrival")
            {
                foreach (char c in searchCar.Search)
                {
                    return pom.FindAll(x => x.Arrival.ToLower() == searchCar.Search.ToLower());
                }
            }

                return nullList;
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

        [HttpPost]
        [Route("GetSearchedFlights")]
        public async Task<ActionResult<IEnumerable<Flight>>> GetSearchedFlights(object form)
        {
            try
            {
                var jsonString = form.ToString();
                SearchFlightsForm f = JsonConvert.DeserializeObject<SearchFlightsForm>(jsonString);

                Aircompany company = context.Aircompanies.Include(x => x.Flights).SingleOrDefault(x => x.Id == f.Aircompany);

                List<Flight> result = new List<Flight>();
                result = company.Flights;


                if (!String.IsNullOrEmpty(f.Arrival))
                    result.RemoveAll(x => x.Arrival.ToLower() != f.Arrival.ToLower());
                if (!String.IsNullOrEmpty(f.Departure))
                    result.RemoveAll(x => x.Departure.ToLower() != f.Departure.ToLower());
                if (!String.IsNullOrEmpty(f.StartDay))
                {
                    DateTime d = Convert.ToDateTime(f.StartDay);
                    result.RemoveAll(x => x.TakeOff.Day != d.Day);
                }
                if (!String.IsNullOrEmpty(f.EndDay))
                {
                    DateTime d = Convert.ToDateTime(f.EndDay);
                    result.RemoveAll(x => x.TouchDown.Day != d.Day);
                }
                if (!String.IsNullOrEmpty(f.Type))
                {
                    if (!f.Type.Contains("One"))
                        result.RemoveAll(x => x.Tip != FlightTypes.ONEWAY);
                    else
                        result.RemoveAll(x => x.Tip != FlightTypes.ROUNDTRIP);
                }

                return result;
            }
            catch (Exception e)
            {

            }

            return new List<Flight>();
        }


        [HttpGet]
        [Route("GetFirstClassSeatsForFlight/{id}")]
        public async Task<ActionResult<IEnumerable<FlightSeatForm>>> GetFirstClassSeatsForFlight(int id)
        {
            try
            {
                List<FlightSeat> list =  context.FlightSeats.Include(x=>x.Flight).Where(x => x.Flight.Id == id && x.Class==Class.FIRST).ToList();
                List<FlightSeatForm> retVal = new List<FlightSeatForm>();
                
                foreach(var item in list)
                {
                    retVal.Add(new FlightSeatForm()
                    {
                        Id = item.Id,
                        Price = item.Price,
                        Class = item.Class,
                        Flight = item.Flight.Id,
                        Reserved = item.Reserved
                    });

                }

                return retVal;
            }catch(Exception e)
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("GetBusinessClassSeatsForFlight/{id}")]
        public async Task<ActionResult<IEnumerable<FlightSeatForm>>> GetBusinessClassSeatsForFlight(int id)
        {
            try
            {
                List<FlightSeat> list = context.FlightSeats.Include(x => x.Flight).Where(x => x.Flight.Id == id && x.Class == Class.BUSINESS).ToList();
                List<FlightSeatForm> retVal = new List<FlightSeatForm>();

                foreach (var item in list)
                {
                    retVal.Add(new FlightSeatForm()
                    {
                        Id = item.Id,
                        Price = item.Price,
                        Class = item.Class,
                        Flight = item.Flight.Id,
                        Reserved = item.Reserved
                    });

                }

                return retVal;
            }
            catch (Exception e)
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("GetEconomyClassSeatsForFlight/{id}")]
        public async Task<ActionResult<IEnumerable<FlightSeatForm>>> GetEconomyClassSeatsForFlight(int id)
        {
            try
            {
                List<FlightSeat> list = context.FlightSeats.Include(x => x.Flight).Where(x => x.Flight.Id == id && x.Class == Class.ECONOMY).ToList();
                List<FlightSeatForm> retVal = new List<FlightSeatForm>();

                foreach (var item in list)
                {
                    retVal.Add(new FlightSeatForm()
                    {
                        Id = item.Id,
                        Price = item.Price,
                        Class = item.Class,
                        Flight = item.Flight.Id,
                        Reserved = item.Reserved
                    });

                }

                return retVal;
            }
            catch (Exception e)
            {
                return NoContent();
            }
        }


        [HttpPost]
        [Route("MakeReservation")]
        public async Task<IActionResult> MakeReservation(object res)
        {
            try
            {


                var jsonStr = res.ToString();

                FlightReservationForm form = new FlightReservationForm();

                form = JsonConvert.DeserializeObject<FlightReservationForm>(jsonStr);

                if (form.InvitedFriends.Count != (form.Seats.Count - 1))
                    return NoContent();

                FlightReservation fRes;
                FlightSeat seat = new FlightSeat();

                foreach (var item in form.Seats)
                {
                    seat = context.FlightSeats.Find(item.Id);
                    seat.Reserved = true;

                    context.FlightSeats.Update(seat);
                    await context.SaveChangesAsync();
                }

                for (int i = 0; i < form.InvitedFriends.Count; i++)
                {
                    ///if(form.User != form.InvitedFriends)
                    fRes = new FlightReservation()
                    {
                        SeatId = form.Seats[i].Id,
                        FlightId = form.FlightId,
                        UserId = form.InvitedFriends[i].Id,
                        Accepted = false
                    };
                    context.FlightReservations.Add(fRes);
                    await context.SaveChangesAsync();
                }

                context.FlightReservations.Add(new FlightReservation()
                {
                    FlightId = form.FlightId,
                    SeatId = form.Seats.Last().Id,
                    Accepted = true,
                    UserId = form.User
                });


                await context.SaveChangesAsync();

                foreach (var item in form.InvitedFriends)
                {
                    string to = "bokimaric97@gmail.com";
                    string from = "bokimaric97@gmail.com";
                    string subject = "Poziv za let";
                    string body = $"Postovani ,\n" +
                        $"Pozvani ste na let\n" +
                        $"\n" +
                        $"Kliknite na link http://localhost:4200/mainPage kako biste pristupili stranici " +
                        $"za prihavatanje ili odbijanje ponude.";
                    using (MailMessage mailMessage = new MailMessage(from, to, subject, body))
                    {
                        try
                        {
                            using (SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587))
                            {
                                smtpClient.EnableSsl = true;
                                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                                smtpClient.UseDefaultCredentials = false;
                                smtpClient.Credentials = new NetworkCredential(from, "Geografija9977");
                                smtpClient.Send(mailMessage);
                            }
                        }
                        catch (Exception e)
                        {
                            return BadRequest();
                        }
                    }
                }


                return Ok();
            }
            catch (Exception e)
            {
                return NoContent();
            }

        }

        [HttpGet]
        [Route("GetMyReservations/{id}")]
        public async Task<ActionResult<IEnumerable<MyFlightReservation>>> GetMyReservations(string id)
        {
            try
            {
                List<MyFlightReservation> retVal = new List<MyFlightReservation>();
                List<FlightReservation> reservations = context.FlightReservations.Where(x => x.UserId == id && x.Accepted==true).ToList();


                Flight flight = new Flight();
                TimeSpan timeSpan = new TimeSpan();

                foreach (var item in reservations)
                {
                    flight = await context.Flights.Include(x => x.FlightDestinations).ThenInclude(x => x.Destination).SingleOrDefaultAsync(x => x.Id == item.FlightId);

                    timeSpan = flight.TakeOff - DateTime.Now;

                    retVal.Add(new MyFlightReservation()
                    {
                        DepartureDate = flight.TakeOff,
                        From = flight.Departure,
                        To = flight.Arrival,
                        IdReservation = item.Id,
                        CanBeErased = timeSpan.TotalHours >= 3
                    });
                }


                return retVal;
            }catch(Exception e)
            {
                return new List<MyFlightReservation>();
            }
        }


        [HttpDelete]
        [Route("CancelFlight/{id}")]
        public async Task<IActionResult> CancelFlight(int id)
        {
            try
            {
                FlightReservation res = await context.FlightReservations.FindAsync(id);
                Flight flight = await context.Flights.FindAsync(res.FlightId);
                FlightSeat seat = await context.FlightSeats.FindAsync(res.SeatId);

                TimeSpan timeSpan = flight.TakeOff - DateTime.Now;

                if(timeSpan.TotalHours >= 3)
                {
                    seat.Reserved = false;

                    context.FlightSeats.Update(seat);
                    await context.SaveChangesAsync();

                    context.FlightReservations.Remove(res);
                    await context.SaveChangesAsync();
                }
                else
                {
                    return BadRequest();
                }
                

                return Ok();
            }catch(Exception e)
            {
                return BadRequest();
            }
        }
    }
}