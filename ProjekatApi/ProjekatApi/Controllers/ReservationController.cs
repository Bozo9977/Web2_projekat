﻿using System;
using System.Collections.Generic;
using System.Data;
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
    public class ReservationController : ControllerBase
    {
        private readonly DatabaseContext context;
        private UserManager<ApplicationUser> _userManager;
        public ReservationController(DatabaseContext _context, UserManager<ApplicationUser> userManager)
        {
            context = _context;
            _userManager = userManager;
        }

        [HttpPost]
        [Route("SearchAvailableCar")]
        public async Task<ActionResult<IEnumerable<CarFromModel>>> SearchAvailableCar(FilterCar filterCar)
        {
            List<CarFromModel> carFromModels = new List<CarFromModel>();

            CarCompany cc = new CarCompany();

            var listCompany = context.BranchOffices.Include(x => x.Id_company).ToList().SingleOrDefault(x => x.Id == Int32.Parse(filterCar.Id));

            if (listCompany == null)
            {
                var company = context.Companies.Find(Int32.Parse(filterCar.Id));
                cc = (CarCompany)company;
            }
            else
            {
                cc = listCompany.Id_company;
            }




            var rezervacije = context.ReservationCar.ToList();

            List<ReservationCar> filterReservation = new List<ReservationCar>();

            var pom = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == cc.Id).Cars.ToList();


            //PROVERITI DA LI SU KOLA NA POPUSTU

            var listaVozilaNaPopustu = context.DiscountCars.ToList();

            foreach (var popust in listaVozilaNaPopustu)
            {
                foreach (var auto in pom)
                {
                    if (auto.Id == popust.carId)
                    {
                        var poredjenje1 = DateTime.Compare(filterCar.startDay, popust.StartDay);
                        var poredjenje2 = DateTime.Compare(filterCar.endDay, popust.StartDay);

                        if (poredjenje1 < 0 && poredjenje2 < 0)
                        {
                            continue;
                        }
                        else if (poredjenje1 > 0 && poredjenje2 > 0)
                        {
                            var poredjenje3 = DateTime.Compare(filterCar.startDay, popust.EndDay);
                            var poredjenje4 = DateTime.Compare(filterCar.endDay, popust.EndDay);

                            if (poredjenje3 > 0 && poredjenje4 > 0)
                            {
                                continue;
                            }
                            else
                            {
                                carFromModels = null;
                                return carFromModels;
                            }
                        }
                        else
                        {
                            carFromModels = null;
                            return carFromModels;
                        }


                    }
                }
            }




            var pom1 = pom.FindAll(x => x.Mark.ToLower() == filterCar.Mark.ToLower());

            if (pom1.Count != 0)
            {
                var pom2 = pom1.FindAll(x => x.Seat == filterCar.Number.ToString());
                if (pom2.Count != 0)
                {
                    if (context.ReservationCar.ToList().Count == 0)
                    {

                        foreach (var cars in pom2)
                        {
                            CarFromModel cfm = new CarFromModel();
                            cfm.AirConditioning = cars.AirConditioning;
                            cfm.Bags = Int32.Parse(cars.Bags);
                            cfm.Door = Int32.Parse(cars.Door);
                            cfm.Fuel = cars.Fuel;
                            cfm.Gearshift = cars.Gearshift;
                            cfm.Id = cars.Id;
                            cfm.ImageCar = cars.ImageCar;
                            cfm.Mark = cars.Mark;
                            cfm.RentPerDay = Int32.Parse(cars.RentPerDay);
                            cfm.Seat = Int32.Parse(cars.Seat);
                            cfm.YearProduction = Int32.Parse(cars.YearProduction);
                            cfm.Rating = cars.AverageRating.ToString();
                            carFromModels.Add(cfm);

                        }

                    }

                    else
                    {

                        foreach (var cars in pom2)
                        {
                            var rez = rezervacije.FindAll(x => x.IdCar == cars.Id);
                            Model.ReservationCar rc = new Model.ReservationCar();

                            if (rez.Count() != 0)
                            {

                                foreach (var rezervacija in rez)
                                {

                                    int result = DateTime.Compare(filterCar.startDay, rezervacija.Day1);
                                    int result2 = DateTime.Compare(filterCar.endDay, rezervacija.Day1);

                                    if (result < 0 && result2 < 0)
                                    {

                                        continue;
                                    }
                                    else if (result > 0 && result2 > 0)
                                    {
                                        int result3 = DateTime.Compare(filterCar.startDay, rezervacija.Day2);
                                        int result4 = DateTime.Compare(filterCar.endDay, rezervacija.Day2);


                                        if (result3 > 0 && result4 > 0)
                                        {
                                            continue;
                                        }
                                        else
                                        {
                                            carFromModels = null;
                                            return carFromModels;
                                        }
                                    }
                                    else
                                    {
                                        carFromModels = null;
                                        return carFromModels;
                                    }
                                }

                                TimeSpan t = filterCar.endDay - filterCar.startDay;

                                var elapsedDays = t.Days;

                                var price = elapsedDays * Int32.Parse(cars.RentPerDay);

                                CarFromModel cfm = new CarFromModel();
                                cfm.AirConditioning = cars.AirConditioning;
                                cfm.Bags = Int32.Parse(cars.Bags);
                                cfm.Door = Int32.Parse(cars.Door);
                                cfm.Fuel = cars.Fuel;
                                cfm.Gearshift = cars.Gearshift;
                                cfm.Id = cars.Id;
                                cfm.ImageCar = cars.ImageCar;
                                cfm.Mark = cars.Mark;
                                cfm.RentPerDay = Int32.Parse(cars.RentPerDay);
                                cfm.Seat = Int32.Parse(cars.Seat);
                                cfm.YearProduction = Int32.Parse(cars.YearProduction);
                                cfm.Price = price.ToString();
                                cfm.Rating = cars.AverageRating.ToString();
                                carFromModels.Add(cfm);

                            }

                            else
                            {
                                foreach (var car in pom2)
                                {
                                    CarFromModel cfm = new CarFromModel();
                                    cfm.AirConditioning = car.AirConditioning;
                                    cfm.Bags = Int32.Parse(car.Bags);
                                    cfm.Door = Int32.Parse(car.Door);
                                    cfm.Fuel = car.Fuel;
                                    cfm.Gearshift = car.Gearshift;
                                    cfm.Id = car.Id;
                                    cfm.ImageCar = car.ImageCar;
                                    cfm.Mark = car.Mark;
                                    cfm.RentPerDay = Int32.Parse(car.RentPerDay);
                                    cfm.Seat = Int32.Parse(car.Seat);
                                    cfm.YearProduction = Int32.Parse(car.YearProduction);
                                    cfm.Rating = cars.AverageRating.ToString();
                                    carFromModels.Add(cfm);

                                }
                                return carFromModels;
                            }

                        }


                        return carFromModels;
                    }
                }
                else
                {
                    return carFromModels;
                }

            }
            else
            {
                return carFromModels;
            }

            return carFromModels;
        }

        [HttpPost]
        [Route("CreateReservation")]
        public async Task<IActionResult> CreateReservation(FilterCar filterCar)
        {

            if (filterCar.City1 != "" && filterCar.City2 != "" && filterCar.endDay != null && filterCar.startDay != null && filterCar.Mark != "" && filterCar.Number.ToString() != "")
            {
                ReservationCar rc = new ReservationCar();

                rc.City1 = filterCar.City1;
                rc.City2 = filterCar.City2;
                rc.Day1 = filterCar.startDay;
                rc.Day2 = filterCar.endDay;
                // rc.Car = filterCar.Id;

                //ApplicationUser user = await _userManager.Users.Include(x => x.ReservationCars).ThenInclude(x => x.Car).ThenInclude(x => x.Reservations).SingleOrDefaultAsync(x => x.Id == filterCar.Id);
                // var pomUser = _userManager.Users.Include(x => x.ReservationCars).ThenInclude(x => x.Car).SingleOrDefault(x => x.Id == filterCar.IdUser);
                var pomCar = context.Cars.Include(x => x.CarCompany).ToList().SingleOrDefault(x => x.Id == filterCar.Id);

                var pomUser = await _userManager.FindByIdAsync(filterCar.IdUser);


                rc.IdCar = pomCar.Id;
                rc.IdUser = pomUser.Id;
                rc.IdCompany = pomCar.CarCompany.Id.ToString();

                TimeSpan t = filterCar.endDay - filterCar.startDay;

                var elapsedDays = Math.Abs(t.Days);

                var price = elapsedDays * Int32.Parse(pomCar.RentPerDay);

                rc.Price = price;

                context.ReservationCar.Add(rc);

                bool saveFailed;

                do
                {
                    saveFailed = false;
                    try
                    {
                        await context.SaveChangesAsync();
                    }
                    catch (DbUpdateConcurrencyException ex)
                    {
                        saveFailed = true;
                        return null;
                    }
                    catch (Exception e)
                    {

                        throw;
                    }
                } while (saveFailed);

                return Ok();
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet]
        [Route("GetReservations/{id}")]
        public async Task<ActionResult<IEnumerable<Rate>>> GetReservations(string id)
        {
            List<Rate> listRate = new List<Rate>();

            var pom =  context.ReservationCar.ToList();

            var rezervacije = pom.FindAll(x => x.IdUser == id);

            foreach(var rez in rezervacije)
            {
               var day = DateTime.Compare(rez.Day2, DateTime.Now);

                if(day < 0)
                {
                    var company = context.Cars.Include(x => x.CarCompany).ToList().SingleOrDefault(x => x.Id == rez.IdCar).CarCompany;
                    var car = context.Cars.Find(rez.IdCar);

                    Rate rate = new Rate();
                    rate.startDay = rez.Day1;
                    rate.endDay = rez.Day2;
                    rate.id = rez.Id;
                    rate.serviceName = company.Name;
                    rate.vehicle = car.Mark;

                    listRate.Add(rate);
                }
            }

            return listRate;
        }


        [HttpGet]
        [Route("GetFlightReservations/{id}")]
        public async Task<ActionResult<IEnumerable<Rate>>> GetFlightReservations(string id)
        {
            List<Rate> listRate = new List<Rate>();

            var pom = context.FlightReservations.ToList();

            var rezervacije = pom.FindAll(x => x.UserId == id);

            

            foreach (var rez in rezervacije)
            {
                
                var flight = context.Flights.Find(rez.FlightId);
                if(flight != null)
                    {

                
                    var day = DateTime.Compare(flight.TouchDown, DateTime.Now);

                    if (day < 0)
                    {
                        var company = context.Aircompanies.Include(x => x.Flights).SingleOrDefault(x => x.Flights.Any(x => x.Id == rez.FlightId));

                    
                    

                        Rate rate = new Rate();
                        rate.startDay = flight.TakeOff;
                        rate.endDay = flight.TouchDown;
                        rate.id = rez.Id.ToString();
                        rate.serviceName = company.Name;

                        listRate.Add(rate);
                    }
                }
            }

            return listRate;
        }


        [HttpPost]
        [Route("CreateRate")]
        public async Task<IActionResult> CreateRate(CreateRate createRate)
        {
            var reservation = context.ReservationCar.Find(createRate.id);

            if(reservation != null)
            {
                var carId = reservation.IdCar;

                var cc = context.Cars.Include(x => x.CarCompany).ToList().SingleOrDefault(x => x.Id == carId).CarCompany;

                var car = context.Cars.Find(carId);

                var companyId = cc.Id;

                Rating ratingCompany = new Rating();


                ratingCompany.IdService = companyId.ToString();
                ratingCompany.Mark = Int32.Parse(createRate.serviceRating);
                ratingCompany.Descriminator = ServiceType.Company;


                context.Rating.Add(ratingCompany);

                await context.SaveChangesAsync();

                ProsecnaOcena(companyId.ToString(), createRate.serviceRating, cc);

                Rating ratingCar = new Rating();
                ratingCar.IdService = carId;
                ratingCar.Mark = Int32.Parse(createRate.vehicleRating);
                ratingCar.Descriminator = ServiceType.Car;

                context.Rating.Add(ratingCar);
                await context.SaveChangesAsync();

                ProsecnaOcena(carId, createRate.vehicleRating, car);
            }

            else
            {
                var reservationF = context.FlightReservations.Find(Int32.Parse(createRate.id));

                if(reservationF != null)
                {

                    var let = reservationF.FlightId;
                    var Let = context.Flights.Find(let);
                    var company = context.Aircompanies.Include(x => x.Flights).SingleOrDefault(x => x.Flights.Any(x => x.Id == reservationF.FlightId));
                    Rating ratingCompany = new Rating();


                    ratingCompany.IdService = company.Id.ToString();
                    ratingCompany.Mark = Int32.Parse(createRate.serviceRating);
                    ratingCompany.Descriminator = ServiceType.Company;


                    context.Rating.Add(ratingCompany);

                    await context.SaveChangesAsync();

                    ProsecnaOcena(company.Id.ToString(), createRate.serviceRating, company);

                    Rating ratingFlight = new Rating();
                    ratingFlight.IdService = let.ToString();
                    ratingFlight.Mark = Int32.Parse(createRate.vehicleRating);
                    ratingFlight.Descriminator = ServiceType.Flight;

                    context.Rating.Add(ratingFlight);
                    await context.SaveChangesAsync();


                    ProsecnaOcena(let.ToString(), createRate.vehicleRating, Let);

                }
            }

            return Ok();
        }

        public void ProsecnaOcena(string id, string ocena, object serviceToSend)
        {
            var pom = context.Rating.ToList();

            var service = pom.FindAll(x => x.IdService == id);

            var naziv = service[0].Descriminator;

            float prosek = 0;
            float ukupuno = 0;

            if(naziv == ServiceType.Car)
            {
                foreach(var ret in service)
                {
                    ukupuno += ret.Mark;
                }
               // ukupuno += float.Parse(ocena);
                prosek = ukupuno / (service.Count());
                Car c = (Car)serviceToSend;
                c.AverageRating = prosek;
                context.Entry(c).State = EntityState.Modified;

                try
                {
                    context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    NotFound();
                }

            }
            else if(naziv == ServiceType.Company)
            {
                foreach (var ret in service)
                {
                    ukupuno += ret.Mark;
                }
                // ukupuno += float.Parse(ocena);
                prosek = ukupuno / (service.Count());
                Company c = (Company)serviceToSend;
                c.AverageRating = prosek;
                context.Entry(c).State = EntityState.Modified;

                try
                {
                    context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    NotFound();
                }
            }
            else if(naziv == ServiceType.Flight)
            {
                foreach (var ret in service)
                {
                    ukupuno += ret.Mark;
                }
                // ukupuno += float.Parse(ocena);
                prosek = ukupuno / (service.Count());
                Flight c = (Flight)serviceToSend;
                c.AverageRating = prosek;
                context.Entry(c).State = EntityState.Modified;

                try
                {
                    context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    NotFound();
                }
            }
        }

        [HttpDelete]
        [Route("CancelCarReservation/{id}")]
        public async Task<IActionResult> CancelCarReservation(string id)
        {
            try
            {
                ReservationCar res = await context.ReservationCar.FindAsync(id);

                TimeSpan ts = res.Day1 - DateTime.Now;

                if(ts.TotalDays >= 2)
                {
                    context.ReservationCar.Remove(res);
                    await context.SaveChangesAsync();
                }

                return Ok();
            }catch(Exception e)
            {
                return NoContent();
            }
        }

        [HttpDelete]
        [Route("DeleteCarReservationWithFlight/{id}")]
        public async Task<IActionResult> DeleteCarReservationWithFlight(int id)
        {
            try
            {
                FlightReservation fRes = await context.FlightReservations.FindAsync(id);
                Flight flight = await context.Flights.FindAsync(fRes.FlightId);
                ReservationCar cRes = await context.ReservationCar.SingleOrDefaultAsync(x => x.IdUser == fRes.UserId && x.Day1 == flight.TakeOff);

                if (cRes != null)
                {
                    context.ReservationCar.Remove(cRes);
                    await context.SaveChangesAsync();
                }
                else
                {
                    return Ok();
                }

                return Ok();

            }catch(Exception e)
            {
                return NoContent();
            }
        }


    }
}