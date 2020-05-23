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
            carCompany = context.Carcompanies.Find(4);
            carCompany.Cars = new List<Car>();
            car.CarCompany = carCompany;
            carCompany.Cars.Add(car);

            //await context.Cars.AddAsync(car);

            await context.SaveChangesAsync();
            context.Entry(carCompany).State = EntityState.Modified;


            await context.SaveChangesAsync();

            CarCompany cc = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == 4);

            return Ok();
        }

        [HttpDelete]
        [Route("DeleteCar/{id}")]
        public async Task<ActionResult<List<Car>>> DeleteCar(int id)
        {
           CarCompany cc = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == 4);
            List<Car> ListPom = cc.Cars.ToList();
            for (int i=1; i < cc.Cars.Count(); i++)
            {
                if(i == id)
                {
                    
                    cc.Cars.Remove(ListPom[i]);
                }
            }
            

            await context.SaveChangesAsync();

           return cc.Cars.ToList();
        }

        [HttpGet]
        [Route("GetCars")]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {

            return context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == 4).Cars.ToList();
        }
    }
}