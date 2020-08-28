using System;
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

            cc = listCompany.Id_company;

            var rezervacije = context.ReservationCar.ToList();

            List<ReservationCar> filterReservation = new List<ReservationCar>();

            var pom = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == cc.Id).Cars.ToList();

            

            var pom1 = pom.FindAll(x => x.Mark.ToLower() == filterCar.Mark.ToLower());

            if (pom1.Count != 0)
            {
                var pom2 = pom1.FindAll(x => x.Seat == filterCar.Number);
                if (pom2.Count != 0)
                {
                    if (context.ReservationCar.ToList().Count == 0)
                    {
                        
                        foreach(var cars in pom2)
                        {
                            CarFromModel cfm = new CarFromModel();
                            cfm.AirConditioning = cars.AirConditioning;
                            cfm.Bags = cars.Bags;
                            cfm.Door = cars.Door;
                            cfm.Fuel = cars.Fuel;
                            cfm.Gearshift = cars.Gearshift;
                            cfm.Id = cars.Id;
                            cfm.HourlyRent = cars.HourlyRent;
                            cfm.ImageCar = cars.ImageCar;
                            cfm.Mark = cars.Mark;
                            cfm.RentPerDay = cars.RentPerDay;
                            cfm.Seat = cars.Seat;
                            cfm.Status = cars.Status;
                            cfm.YearProduction = cars.YearProduction;
                            cfm.Rating = cars.AverageRating.ToString();
                            carFromModels.Add(cfm);
    
                        }

                    }

                    else
                    {

                        foreach(var cars in pom2)
                        {
                            var rez = rezervacije.FindAll(x => x.IdCar == cars.Id);
                            Model.ReservationCar rc = new Model.ReservationCar();

                            if (rez.Count() != 0)
                            {

                                foreach(var rezervacija in rez)
                                {

                                    int result = DateTime.Compare(filterCar.startDay, rezervacija.Day1);
                                    int result2 = DateTime.Compare(filterCar.endDay, rezervacija.Day1);

                                    if (result < 0 && result2 < 0)
                                    {
                                        /* CarFromModel cfm = new CarFromModel();
                                         cfm.AirConditioning = cars.AirConditioning;
                                         cfm.Bags = cars.Bags;
                                         cfm.Door = cars.Door;
                                         cfm.Fuel = cars.Fuel;
                                         cfm.Gearshift = cars.Gearshift;
                                         cfm.Id = cars.Id;
                                         cfm.HourlyRent = cars.HourlyRent;
                                         cfm.ImageCar = cars.ImageCar;
                                         cfm.Mark = cars.Mark;
                                         cfm.RentPerDay = cars.RentPerDay;
                                         cfm.Seat = cars.Seat;
                                         cfm.Status = cars.Status;
                                         cfm.YearProduction = cars.YearProduction;
                                         carFromModels.Add(cfm);*/
                                        continue;
                                    }
                                    else if (result > 0 && result2 > 0)
                                    {
                                        int result3 = DateTime.Compare(filterCar.startDay, rezervacija.Day2);
                                        int result4 = DateTime.Compare(filterCar.endDay, rezervacija.Day2);

                                        if (result3 < 0 && result4 < 0)
                                        {
                                            /* CarFromModel cfm = new CarFromModel();
                                             cfm.AirConditioning = cars.AirConditioning;
                                             cfm.Bags = cars.Bags;
                                             cfm.Door = cars.Door;
                                             cfm.Fuel = cars.Fuel;
                                             cfm.Gearshift = cars.Gearshift;
                                             cfm.Id = cars.Id;
                                             cfm.HourlyRent = cars.HourlyRent;
                                             cfm.ImageCar = cars.ImageCar;
                                             cfm.Mark = cars.Mark;
                                             cfm.RentPerDay = cars.RentPerDay;
                                             cfm.Seat = cars.Seat;
                                             cfm.Status = cars.Status;
                                             cfm.YearProduction = cars.YearProduction;
                                             carFromModels.Add(cfm);*/
                                            continue;
                                        }
                                        else if(result3 > 0 && result4 > 0)
                                        {
                                            /* CarFromModel cfm = new CarFromModel();
                                             cfm.AirConditioning = cars.AirConditioning;
                                             cfm.Bags = cars.Bags;
                                             cfm.Door = cars.Door;
                                             cfm.Fuel = cars.Fuel;
                                             cfm.Gearshift = cars.Gearshift;
                                             cfm.Id = cars.Id;
                                             cfm.HourlyRent = cars.HourlyRent;
                                             cfm.ImageCar = cars.ImageCar;
                                             cfm.Mark = cars.Mark;
                                             cfm.RentPerDay = cars.RentPerDay;
                                             cfm.Seat = cars.Seat;
                                             cfm.Status = cars.Status;
                                             cfm.YearProduction = cars.YearProduction;
                                             carFromModels.Add(cfm);*/
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
                                cfm.Bags = cars.Bags;
                                cfm.Door = cars.Door;
                                cfm.Fuel = cars.Fuel;
                                cfm.Gearshift = cars.Gearshift;
                                cfm.Id = cars.Id;
                                cfm.HourlyRent = cars.HourlyRent;
                                cfm.ImageCar = cars.ImageCar;
                                cfm.Mark = cars.Mark;
                                cfm.RentPerDay = cars.RentPerDay;
                                cfm.Seat = cars.Seat;
                                cfm.Status = cars.Status;
                                cfm.YearProduction = cars.YearProduction;
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
                                    cfm.Bags = car.Bags;
                                    cfm.Door = car.Door;
                                    cfm.Fuel = car.Fuel;
                                    cfm.Gearshift = car.Gearshift;
                                    cfm.Id = car.Id;
                                    cfm.HourlyRent = car.HourlyRent;
                                    cfm.ImageCar = car.ImageCar;
                                    cfm.Mark = car.Mark;
                                    cfm.RentPerDay = car.RentPerDay;
                                    cfm.Seat = car.Seat;
                                    cfm.Status = car.Status;
                                    cfm.YearProduction = car.YearProduction;
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

            if(filterCar.City1 != "" && filterCar.City2 != "" && filterCar.endDay != null && filterCar.startDay != null && filterCar.Mark != "" && filterCar.Number != "")
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

                var elapsedDays = t.Days;

                var price = elapsedDays * Int32.Parse(pomCar.RentPerDay);

                rc.Price = price;

                context.ReservationCar.Add(rc);

                await context.SaveChangesAsync();

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

                //if(day < 0)
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


        [HttpPost]
        [Route("CreateRate")]
        public async Task<IActionResult> CreateRate(CreateRate createRate)
        {
            var reservation = context.ReservationCar.Find(createRate.id);

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
              //  c.AverageRating = prosek;
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

    }
}