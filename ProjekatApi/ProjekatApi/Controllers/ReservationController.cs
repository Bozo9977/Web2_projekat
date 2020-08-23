using System;
using System.Collections.Generic;
using System.Data;
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
    public class ReservationController : ControllerBase
    {
        private readonly DatabaseContext context;

        public ReservationController(DatabaseContext _context)
        {
            context = _context;

        }

        [HttpPost]
        [Route("SearchAvailableCar")]
        public async Task<ActionResult<IEnumerable<CarFromModel>>> SearchAvailableCar(FilterCar filterCar)
        {
            List<CarFromModel> carFromModels = new List<CarFromModel>();

            CarCompany cc = new CarCompany();

            var listCompany = context.BranchOffices.Include(x => x.Id_company).ToList().SingleOrDefault(x => x.Id == Int32.Parse(filterCar.IdCompany));

            cc = listCompany.Id_company;

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
                            carFromModels.Add(cfm);
    
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

            }
            else
            {
                return carFromModels;
            }

            return carFromModels;
        }

        [HttpPost]
        [Route("CreateReservation")]
        public async Task<IActionResult> CreateReservation(BranchOfficeForm branchOffices)
        {


            return Ok();
        }
    }
}