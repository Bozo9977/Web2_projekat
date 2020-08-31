using System;
using System.Collections.Generic;
using System.Globalization;
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
                Bags = car.Bags.ToString(),
                Door = car.Door.ToString(),
                Fuel = car.Fuel,
                Gearshift = car.Gearshift,
                RentPerDay = car.RentPerDay.ToString(),
                Seat = car.Seat.ToString(),
                YearProduction = car.YearProduction.ToString()
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

        [HttpGet]
        [Route("GetCarcompanies")]
        public async Task<ActionResult<IEnumerable<CarCompany>>> GetCarcompanies()
        {
            return await context.Carcompanies.ToListAsync();
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

            var ret = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == Int32.Parse(id)).Cars.ToList();

            return ret;
        }

        [HttpGet]
        [Route("GetOneCar/{id}")]
        public async Task<ActionResult<CarFromModel>> GetOneCar(string id)
        {



            var car = await context.Cars.FindAsync(id);

            CarFromModel carSend = new CarFromModel()
            {
                Id = car.Id,
                Mark = car.Mark,
                AirConditioning = car.AirConditioning,
                Fuel = car.Fuel,
                Gearshift = car.Gearshift,
                Seat = Int32.Parse(car.Seat),
                Door = Int32.Parse(car.Door),
                YearProduction = Int32.Parse(car.YearProduction),
                Bags = Int32.Parse(car.Bags),
                RentPerDay = Int32.Parse(car.RentPerDay),
                ImageCar = car.ImageCar
            };

            if (car == null)
            {
                return NotFound();
            }

            return carSend;
        }


        [HttpGet]
        [Route("GetAllCars/{id}")]
        public async Task<ActionResult<IEnumerable<Car>>> GetAllCars(string id)
        {

            //  var pom = context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Id == id).ToList();

            List<Car> listCars = new List<Car>();

            /*CarCompany cc = new CarCompany();

            var pom = context.BranchOffices.Include(x => x.Id_company).ToList().SingleOrDefault(x => x.Id == Int32.Parse(id));

            cc = pom.Id_company;*/

            var pomCar = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == Int32.Parse(id)).Cars.ToList();

            

            return pomCar;
        }

        [Route("UpdateCar")]
        public async Task<IActionResult> UpdateCar(CarFromModel car)
        {

            //var carPom = await context.Cars.FindAsync(car.Id);

            Car carSave = new Car()
            {
                Id = car.Id,
                Mark = car.Mark,
                AirConditioning = car.AirConditioning,
                Fuel = car.Fuel,
                Gearshift = car.Gearshift,
                Seat = car.Seat.ToString(),
                Door = car.Door.ToString(),
                YearProduction = car.YearProduction.ToString(),
                Bags = car.Bags.ToString(),
                RentPerDay = car.RentPerDay.ToString(),
                ImageCar = car.ImageCar
            };


            context.Entry(carSave).State = EntityState.Modified;

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

        [HttpGet]
        [Route("GetAverageForCompany/{id}")]
        public async Task<ActionResult<IEnumerable<CarCompany>>> GetAverageForCompany(int id)
        {
            List<CarCompany> listCC = new List<CarCompany>();
            var cc = await context.Carcompanies.FindAsync(id);

            if (cc == null)
            {
                return NotFound();
            }

            listCC.Add(cc);

            return listCC;
        }

        [HttpGet]
        [Route("GetAverageForCar/{id}")]
        public async Task<ActionResult<IEnumerable<Car>>> GetAverageForCar(int id)
        {
            var cc =  context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == id).Cars.ToList();

            if (cc == null)
            {
                return NotFound();
            }
            return cc;
        }


        [HttpPost]
        [Route("SearchAvailableCar")]
        public async Task<ActionResult<IEnumerable<Car>>> SearchAvailableCar(SearchCarForm searchCar)
        {
            List<Car> carList = new List<Car>();
            List<CarFromModel> carList1 = new List<CarFromModel>();

            if (searchCar.Kategorija == "Mark")

            {
                var pom = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == Int32.Parse(searchCar.IdComp)).Cars.ToList();
                carList = pom.FindAll(x => x.Mark.ToLower() == searchCar.Search.ToLower());
            }
            else if (searchCar.Kategorija == "Bags")
            {
                bool isNumeric = true;
                int broj;
                foreach (char c in searchCar.Search)
                {
                    if (!Char.IsNumber(c))
                    {
                        isNumeric = false;
                        break;
                    }
                    else
                    {
                        broj = Int32.Parse(searchCar.Search);
                    }
                }

                if(isNumeric == true)
                {
                    var pom = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == Int32.Parse(searchCar.IdComp)).Cars.ToList();
                    carList = pom.FindAll(x => x.Bags == searchCar.Search);
                }


            }

            else if (searchCar.Kategorija == "Seat")
            {
                bool isNumeric = true;
                int broj;
                foreach (char c in searchCar.Search)
                {
                    if (!Char.IsNumber(c))
                    {
                        isNumeric = false;
                        break;
                    }
                    else
                    {
                        broj = Int32.Parse(searchCar.Search);
                    }
                }
                if (isNumeric == true)
                {
                    var pom = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == Int32.Parse(searchCar.IdComp)).Cars.ToList();
                    carList = pom.FindAll(x => x.Seat.ToLower() == searchCar.Search.ToLower());
                }
            }

            return carList;
        }

        [HttpGet]
        [Route("GetBusinessAverageForCompany/{id}")]
        public async Task<ActionResult<IEnumerable<BusinessReport>>> GetBusinessAverageForCompany(int id)
        {
            List<BusinessReport> listCC = new List<BusinessReport>();
            BusinessReport br = new BusinessReport();

            var cc = context.Carcompanies.Include(x => x.Cars).ToList().SingleOrDefault(x => x.Id == id).Cars.ToList();

            int brojAutomobila = cc.Count();

            var idCompany = cc[0].CarCompany.Id;

            var rez = context.ReservationCar.ToList();
            DateTimeFormatInfo mfi = new DateTimeFormatInfo();
            List<ReservationCar> listReservationDay = new List<ReservationCar>();
            List<ReservationCar> listReservationWeek = new List<ReservationCar>();
            List<ReservationCar> listReservationMonth = new List<ReservationCar>();

            var danasnjiDatum = DateTime.Now;



            var dt = DateTime.Now.DayOfWeek;

            DateTime startOfWeek = danasnjiDatum.AddDays(1 - (int)danasnjiDatum.DayOfWeek);
            DateTime endOfWeek = startOfWeek.AddDays(4);

            var mesec = danasnjiDatum.Month;
            var nazivMeseca = mfi.GetMonthName(mesec).ToString();
            int rezDan = 0;
            int rezMesec = 0;
            var nedeljaTrenutna = CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstDay, DayOfWeek.Monday);

            foreach (var pom in rez)
            {
                var nedelja = CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(pom.Day1, CalendarWeekRule.FirstDay, DayOfWeek.Monday);

                if (nedelja == nedeljaTrenutna)
                {
                    listReservationWeek.Add(pom);
                }

                if (DateTime.Compare(danasnjiDatum.Date, pom.Day1.Date) == 0)
                {
                    listReservationDay.Add(pom);
                }

                else if (DateTime.Compare(danasnjiDatum.Date, pom.Day1.Date) > 0)
                {
                    if (DateTime.Compare(danasnjiDatum.Date, pom.Day1.Date) <= 0)
                    {
                        listReservationDay.Add(pom);
                    }
                }

                if (mesec == pom.Day1.Month)
                {
                    listReservationMonth.Add(pom);
                }
            }

            var companyListDay = listReservationDay.FindAll(x => x.IdCompany == idCompany.ToString());
            var companyListMonth = listReservationMonth.FindAll(x => x.IdCompany == idCompany.ToString());
            var companyListWeek = listReservationWeek.FindAll(x => x.IdCompany == idCompany.ToString());

            br.ratingPerDay = companyListDay.Count().ToString();
            string[] parsiraj = danasnjiDatum.ToString().Split(" ");
            br.Today = parsiraj[0];
            br.ratingPerMonth = companyListMonth.Count().ToString();
            br.Month = nazivMeseca;
            br.ratingPerWeek = listReservationWeek.Count().ToString();
            br.StartDayOdWeek = startOfWeek.ToString().Split(" ")[0];
            br.EndDayOdWeek = endOfWeek.ToString().Split(" ")[0];
            br.CarsCount = brojAutomobila.ToString();
            listCC.Add(br);





            return listCC;
        }

        [HttpGet]
        [Route("GetIncomeReportForCompany/{id}")]
        public async Task<ActionResult<IEnumerable<IncomeReport>>> GetIncomeReportForCompany(int id)
        {
            List<IncomeReport> listIncomeReport = new List<IncomeReport>();
            IncomeReport ir = new IncomeReport();
            DateTimeFormatInfo mfi = new DateTimeFormatInfo();

            var rez = context.ReservationCar.ToList();

            var varRezKomp = rez.FindAll(x => x.IdCompany == id.ToString());
            var today = DateTime.Today;
            var godina = CultureInfo.InvariantCulture.Calendar.GetYear(DateTime.Now);
            var mesec = new DateTime(today.Year, today.Month, 1);

            var nazivMeseca3start = mfi.GetMonthName(mesec.AddMonths(-3).Month).ToString();
            var nazivMeseca3end = mfi.GetMonthName(mesec.AddMonths(-1).Month).ToString();
            float godisnjiPrihod = 0;
            float TriMesecaPrihod = 0;
            float tekuciMesec = 0;
            float SestMesecaPrihod = 0;


            var month = new DateTime(today.Year, today.Month, 1);
            var previous = month.AddMonths(-1);
            var previous2 = month.AddMonths(-10);
            var n = previous.Month;

            foreach (var pom in varRezKomp)
            {
                if (godina == pom.Day1.Year)
                {
                    if (godina == pom.Day2.Year)
                    {
                        godisnjiPrihod += pom.Price;
                    }
                }

                if (pom.Day1.Month == month.AddMonths(-1).Month || pom.Day1.Month == month.AddMonths(-2).Month || pom.Day1.Month == month.AddMonths(-3).Month)
                {
                    if (pom.Day2.Month == month.AddMonths(-1).Month || pom.Day2.Month == month.AddMonths(-2).Month || pom.Day2.Month == month.AddMonths(-3).Month)
                    {
                        TriMesecaPrihod += pom.Price;
                    }
                }

                if (pom.Day1.Month == month.AddMonths(-1).Month || pom.Day1.Month == month.AddMonths(-2).Month || pom.Day1.Month == month.AddMonths(-3).Month || pom.Day1.Month == month.AddMonths(-4).Month || pom.Day1.Month == month.AddMonths(-5).Month || pom.Day1.Month == month.AddMonths(-6).Month)
                {
                    if (pom.Day2.Month == month.AddMonths(-1).Month || pom.Day2.Month == month.AddMonths(-1).Month || pom.Day2.Month == month.AddMonths(-1).Month || pom.Day2.Month == month.AddMonths(-4).Month || pom.Day2.Month == month.AddMonths(-5).Month || pom.Day2.Month == month.AddMonths(-6).Month)
                    {
                        SestMesecaPrihod += pom.Price;
                    }
                }

                if (pom.Day1.Month == month.Month && pom.Day2.Month == month.Month)
                {
                    tekuciMesec += pom.Price;
                }
            }

            ir.IncomePerYear = godisnjiPrihod.ToString();
            ir.Year = godina.ToString();
            ir.IncomePer3Month = TriMesecaPrihod.ToString();
            ir.start3 = nazivMeseca3start;
            ir.end3 = nazivMeseca3end;
            ir.IncomePerMonth = tekuciMesec.ToString();
            ir.Month = mfi.GetMonthName(month.Month).ToString();
            ir.start6 = mfi.GetMonthName(mesec.AddMonths(-6).Month).ToString();
            ir.end6 = mfi.GetMonthName(mesec.AddMonths(-1).Month).ToString();
            ir.IncomePer6Month = SestMesecaPrihod.ToString();
            listIncomeReport.Add(ir);

            return listIncomeReport;
        }

        [HttpPost]
        [Route("AddDiscountCar")]
        public async Task<IActionResult> AddDiscountCar(DiscountFromModel discountCar)
        {
            var car = context.Cars.Find(discountCar.IdCar);

            if (car != null)
            {

                var dis = context.DiscountCars.ToList();
                var disList = dis.FindAll(x => x.carId == discountCar.IdCar);

                var losDatum1 = DateTime.Compare(discountCar.StartDay, DateTime.Now);
                var losDatum2 = DateTime.Compare(discountCar.EndDay, DateTime.Now);

                /*if (losDatum1 < 0 || losDatum2 < 0)
                {
                    return BadRequest();
                }*/

                if (disList.Count() != 0)
                {
                    foreach (var v in disList)
                    {
                        var poredjenje1 = DateTime.Compare(discountCar.StartDay, v.StartDay);
                        var poredjenje2 = DateTime.Compare(discountCar.StartDay, v.EndDay);
                        var poredjenje3 = DateTime.Compare(discountCar.EndDay, v.StartDay);
                        var poredjenje4 = DateTime.Compare(discountCar.EndDay, v.EndDay);



                        if (poredjenje1 <= 0 && poredjenje3 <= 0)
                        {
                            DiscountCar discountPom = new DiscountCar();
                            discountPom.EndDay = discountCar.EndDay;
                            discountPom.carId = discountCar.IdCar;
                            discountPom.Procenat = (int)discountCar.Procenat;
                            discountPom.StartDay = discountCar.StartDay;
                            discountPom.Cena = float.Parse(car.RentPerDay);

                            var pr = (float)discountCar.Procenat / 100;
                            var novaCena = Int32.Parse(car.RentPerDay) * pr;

                            discountPom.NovaCena = Int32.Parse(car.RentPerDay) - (int)novaCena;

                            context.DiscountCars.Add(discountPom);

                            await context.SaveChangesAsync();
                        }

                        if (poredjenje2 >= 0 && poredjenje4 >= 0)
                        {
                            DiscountCar discountPom = new DiscountCar();
                            discountPom.EndDay = discountCar.EndDay;
                            discountPom.carId = discountCar.IdCar;
                            discountPom.Procenat = (int)discountCar.Procenat;
                            discountPom.StartDay = discountCar.StartDay;
                            discountPom.Cena = float.Parse(car.RentPerDay);

                            var pr = (float)discountCar.Procenat / 100;
                            var novaCena = Int32.Parse(car.RentPerDay) * pr;

                            discountPom.NovaCena = Int32.Parse(car.RentPerDay) - (int)novaCena;

                            context.DiscountCars.Add(discountPom);

                            await context.SaveChangesAsync();
                        }



                    }
                }
                else
                {
                    DiscountCar discountPom = new DiscountCar();
                    discountPom.EndDay = discountCar.EndDay;
                    discountPom.carId = discountCar.IdCar;
                    discountPom.Procenat = (int)discountCar.Procenat;
                    discountPom.StartDay = discountCar.StartDay;
                    discountPom.Cena = float.Parse(car.RentPerDay);

                    var pr = (float)discountCar.Procenat / 100;
                    var novaCena = Int32.Parse(car.RentPerDay) * pr;

                    discountPom.NovaCena = Int32.Parse(car.RentPerDay) - (int)novaCena;

                    context.DiscountCars.Add(discountPom);

                    await context.SaveChangesAsync();
                }


            }


            return Ok();
        }

        [HttpGet]
        [Route("GetDiscountCars/{id}")]
        public async Task<ActionResult<IEnumerable<DiscaountCarsView>>> GetDiscountCars(string id)
        {
            List<DiscaountCarsView> dc = new List<DiscaountCarsView>();
            var rezNaPopustuLista = context.DiscountCars.ToList();

            var let = context.Flights.Find(Int32.Parse(id));

            if (rezNaPopustuLista.Count() != 0)
            {
                foreach (var v in rezNaPopustuLista)
                {
                    var poredjenje1 = DateTime.Compare(let.TakeOff, v.StartDay);
                    var poredjenje2 = DateTime.Compare(let.TouchDown, v.StartDay);

                    if (poredjenje1 >= 0 && poredjenje2 >= 0)
                    {
                        var poredjenje3 = DateTime.Compare(let.TakeOff, v.EndDay);
                        var poredjenje4 = DateTime.Compare(let.TouchDown, v.EndDay);

                        if (poredjenje3 <= 0 && poredjenje4 <= 0)
                        {
                            var car = context.Cars.Find(v.carId);
                            DiscaountCarsView dcv = new DiscaountCarsView();
                            dcv.AirConditioning = car.AirConditioning;
                            dcv.Bags = car.Bags;
                            dcv.Door = car.Door;
                            dcv.Fuel = car.Fuel;
                            dcv.Gearshift = car.Gearshift;
                            dcv.Mark = car.Mark;
                            dcv.Popust = v.NovaCena.ToString();
                            dcv.RentPerDay = car.RentPerDay;
                            dcv.Seat = car.Seat;
                            dcv.YearProduction = car.YearProduction;
                            dcv.startDay = v.StartDay;
                            dcv.endDay = v.EndDay;
                            dcv.Id = v.Id;
                            dc.Add(dcv);

                        }
                    }


                }
            }

            return dc;
        }

        [HttpPost]
        [Route("CreateFastRate")]
        public async Task<IActionResult> CreateFastRate(DiscountUser discountUser)
        {

            ReservationCar rc = new ReservationCar();

            var discountRez = context.DiscountCars.Find(discountUser.IdCar);

            var daLiPostoji = context.ReservationCar.ToList();

            var postoji = daLiPostoji.Find(x => x.IdDiscountCar == discountRez.Id);

            if(postoji != null)
            {
                return BadRequest();
            }

            else
            {
                var car = context.Cars.Include(x => x.CarCompany).SingleOrDefault(x => x.Id == discountRez.carId);

                rc.Day1 = discountRez.StartDay;
                rc.Day2 = discountRez.EndDay;
                rc.City1 = car.CarCompany.Address;
                rc.City2 = car.CarCompany.Address;


                var pomUser = await userManager.FindByIdAsync(discountUser.IdUser);


                rc.IdCar = car.Id;
                rc.IdUser = pomUser.Id;
                rc.IdCompany = car.CarCompany.Id.ToString();

                TimeSpan t = discountRez.StartDay - discountRez.EndDay;

                var elapsedDays = Math.Abs(t.Days);

                var price = elapsedDays * Int32.Parse(car.RentPerDay);

                rc.Price = price;
                rc.IdDiscountCar = discountRez.Id;

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
            }
            return Ok();
        }

    }
}