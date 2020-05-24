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
    public class CarCompanyController : ControllerBase
    {
        private readonly DatabaseContext context;

        public CarCompanyController(DatabaseContext _context)
        {
            context = _context;
            
        }

        [HttpPost]
        [Route("AddCarCompany")]
        public async Task<IActionResult> AddCarCompany(CompanyRegister company)
        {
            CarCompany carCompany = new CarCompany()
            {
                Cars = new List<Car>(),
                Name = company.RegistrationNameService,
                Address = null,
                Description = null

        };

            context.Carcompanies.Add(carCompany);
            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpPost]
        [Route("AddCar")]
        public async Task<IActionResult> AddCar(Car car)
        {

            CarCompany carCompany = new CarCompany();

            carCompany = context.Carcompanies.Find(1);

            carCompany.Cars = new List<Car>();

            car.CarCompany = carCompany;

            carCompany.Cars.Add(car);




            await context.SaveChangesAsync();

            context.Entry(carCompany).State = EntityState.Modified;





            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCar/{id}")]
        public async Task<ActionResult<List<Car>>> DeleteCar(string id)
        {
           CarCompany cc = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == 1);
            List<Car> ListPom = cc.Cars.ToList();

            foreach(var pom in ListPom)
            {
                if(pom.Id == id)
                {
                    cc.Cars.Remove(pom);
                }
            }
            

            await context.SaveChangesAsync();

           return cc.Cars.ToList();
        }

        [HttpGet]
        [Route("GetCars")]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {

            return context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == 1).Cars.ToList();
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