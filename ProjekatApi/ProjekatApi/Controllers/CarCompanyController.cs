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
    public class CarCompanyController : ControllerBase
    {
        private readonly DatabaseContext context;
        private readonly UserManager<ApplicationUser> userManager;
        public CarCompanyController(DatabaseContext _context, UserManager<ApplicationUser> _userManager)
        {
            context = _context;
            userManager = _userManager;
        }

        [HttpPost]
        [Route("AddCarCompany")]
        public async Task<IActionResult> AddCarCompany(CompanyRegister company)
        {
            CarCompany carCompany = new CarCompany()
            {
                Cars = new List<Car>(),
                Name = company.RegistrationNameService,
                Address = company.Address,
                Description = company.Description
            };


            carCompany.Administrator = await userManager.FindByNameAsync(company.Email);
            context.Carcompanies.Add(carCompany);

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("GetCarcompanyForUser/{UserID}")]
        public async Task<IActionResult> GetCarcompanyForUser(string UserID)
        {
            Company ret;
            if ((ret = await context.Companies.SingleOrDefaultAsync(x => x.Administrator.Id == UserID)) != null)
            {
                return Ok(ret);
            }
            else
            {
                return NotFound("Carcompany for user not found.");
            }

        }

        [HttpPost]
        [Route("AddCar")]
        public async Task<IActionResult> AddCar(CarFromModel car)
        {

            Car carPom = new Car()
            {
                Mark = car.Mark,
                AirConditioning = car.AirConditioning,
                Bags = car.Bags,
                Door = car.Door,
                Fuel = car.Fuel,
                Gearshift = car.Gearshift,
                HourlyRent = car.HourlyRent,
                ImageCar = car.ImageCar,
                RentPerDay = car.RentPerDay,
                Seat = car.Seat,
                Status = car.Status,
                YearProduction = car.YearProduction
            };

            var company = await context.Companies.FindAsync(car.IdCompany);

            carPom.CarCompany = (CarCompany)company;

            //   carCompany.Cars = new List<Car>();

            // car.CarCompany = carCompany;

            //  carCompany.Cars.Add(car);


            context.Cars.Add(carPom);

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCar/{id}")]
        public async Task<ActionResult<List<Car>>> DeleteCar(string id)
        {
            var car = await context.Cars.Include(x=>x.CarCompany).SingleOrDefaultAsync(x=>x.Id == id);

            Car carPom = new Car();

            carPom = car;

            int idCompany = carPom.CarCompany.Id;

            context.Cars.Remove(carPom);

            await context.SaveChangesAsync();

            List<Car> listCars = new List<Car>();

            return context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == idCompany).Cars.ToList();


        }

        [HttpGet]
        [Route("GetCars/{id}")]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars(string id)
        {

            return context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == Int32.Parse(id)).Cars.ToList();
        }

        [HttpGet]
        [Route("GetOneCar/{id}")]
        public async Task<ActionResult<Car>> GetOneCar(string id)
        {

            var car = await context.Cars.FindAsync(id);

            if (car == null)
            {
                return NotFound();
            }

            return car;
        }


        [HttpGet]
        [Route("GetAllCars/{id}")]
        public async Task<ActionResult<IEnumerable<Car>>> GetAllCars(string id)
        {

            //  var pom = context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Id == id).ToList();

            List<Car> listCars = new List<Car>();

            CarCompany cc = new CarCompany();

            var pom = context.BranchOffices.Include(x => x.Id_company).ToList().SingleOrDefault(x => x.Id == Int32.Parse(id));

            cc = pom.Id_company;

            var pomCar = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == cc.Id).Cars.ToList();

            

            return pomCar;
        }

        [Route("UpdateCar")]
        public async Task<IActionResult> UpdateCar(Car car)
        {

            //var carPom = await context.Cars.FindAsync(car.Id);


            context.Entry(car).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}