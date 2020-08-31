using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using ProjekatApi.FormModel;
using ProjekatApi.Model;

namespace ProjekatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirCompanyController : ControllerBase
    {
        private readonly DatabaseContext context;
        private readonly UserManager<ApplicationUser> userManager;

        public AirCompanyController(DatabaseContext _context, UserManager<ApplicationUser> _userManager)
        {
            context = _context;
            userManager = _userManager;
        }

        [HttpPost]
        [Route("AddAirCompany")]
        public async Task<IActionResult> AddAirCompany(CompanyRegister company)
         {
            Aircompany airCompanyPom = new Aircompany();
            airCompanyPom.Name = company.RegistrationNameService;
            airCompanyPom.Address = company.Address;
            airCompanyPom.Description = company.Description;
            airCompanyPom.Destinations = null;
            airCompanyPom.Flights = null;

            airCompanyPom.Administrator = await userManager.FindByNameAsync(company.Email);
            context.Aircompanies.Add(airCompanyPom);

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpGet]
        [Route("GetAircompanies")]
        public async Task<ActionResult<IEnumerable<Aircompany>>> GetAircompanies()
        {
            return await context.Aircompanies.ToListAsync();
        }

        [HttpGet]
        [Route("GetAircompanyForUser/{UserID}")]
        public async Task<IActionResult> GetAircompanyForUser(string UserID)
        {
            Aircompany ret;
            if((ret = await context.Aircompanies.SingleOrDefaultAsync(x=>x.Administrator.Id == UserID)) != null)
            {
                return Ok(ret);
            }
            else
            {
                return NotFound("Aircompany for user not found.");
            }
            
        }

        [HttpGet]
        [Route("GetLuggageInfoForCompany/{id}")]
        public async Task<ActionResult<IEnumerable<FlightLuggage>>> GetLuggageInfoForCompany(int id)
        {
            return context.Luggages.Where(x => x.IdCompany == id).ToList();
        }

        [HttpPost]
        [Route("AddLuggage")]
        public async Task<IActionResult> AddLuggage(FlightLuggage lugg)
        {
            try
            {
                await context.Luggages.AddAsync(lugg);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return NoContent();
            }

        }

        [Route("ChangeLuggageForCompany")]
        public async Task<IActionResult> ChangeLuggageForCompany(FlightLuggage lugg)
        {
            try
            {
                FlightLuggage fl = await context.Luggages.SingleOrDefaultAsync(x => x.IdCompany == lugg.IdCompany);
                fl.CarryOnPrice = lugg.CarryOnPrice;
                fl.DuffelPrice = lugg.DuffelPrice;
                context.Luggages.Update(fl);
                await context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return NoContent();
            }
        }

        [HttpGet]
        [Route("GetBusinessReportForAircompany/{id}")]
        public async Task<ActionResult<IEnumerable<BusinessReport>>> GetBusinessReportForAircompany(int id)
        {
            List<BusinessReport> retVal = new List<BusinessReport>();
            BusinessReport br = new BusinessReport();

            var flights = context.Aircompanies.Include(x => x.Flights).SingleOrDefault(x => x.Id == id).Flights.ToList();

            int noFlights = flights.Count();

            var idCompany = id;

            var reservations = context.FlightReservations.ToList();

            reservations.RemoveAll(x => !flights.Any(p => p.Id == x.FlightId));


            DateTimeFormatInfo mfi = new DateTimeFormatInfo();
            List<FlightReservation> listReservationDay = new List<FlightReservation>();
            List<FlightReservation> listReservationWeek = new List<FlightReservation>();
            List<FlightReservation> listReservationMonth = new List<FlightReservation>();

            var danasnjiDatum = DateTime.Now;



            var dt = DateTime.Now.DayOfWeek;

            DateTime startOfWeek = danasnjiDatum.AddDays(1 - (int)danasnjiDatum.DayOfWeek);
            DateTime endOfWeek = startOfWeek.AddDays(4);

            var mesec = danasnjiDatum.Month;
            var nazivMeseca = mfi.GetMonthName(mesec).ToString();
            int rezDan = 0;
            int rezMesec = 0;
            var nedeljaTrenutna = CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstDay, DayOfWeek.Monday);

            foreach (var pom in reservations)
            {
                Flight f = context.Flights.SingleOrDefault(x => x.Id == pom.FlightId);

                var nedelja = CultureInfo.InvariantCulture.Calendar.GetWeekOfYear(f.TakeOff, CalendarWeekRule.FirstDay, DayOfWeek.Monday);

                if (nedelja == nedeljaTrenutna)
                {
                    listReservationWeek.Add(pom);
                }

                if (DateTime.Compare(danasnjiDatum.Date, f.TakeOff.Date) == 0)
                {
                    listReservationDay.Add(pom);
                }

                else if (DateTime.Compare(danasnjiDatum.Date, f.TakeOff.Date) > 0)
                {
                    if (DateTime.Compare(danasnjiDatum.Date, f.TakeOff.Date) <= 0)
                    {
                        listReservationDay.Add(pom);
                    }
                }

                if (mesec == f.TakeOff.Month)
                {
                    listReservationMonth.Add(pom);
                }
            }


            br.ratingPerDay = listReservationDay.Count().ToString();
            string[] parsiraj = danasnjiDatum.ToString().Split(" ");
            br.Today = parsiraj[0];
            br.ratingPerMonth = listReservationDay.Count().ToString();
            br.Month = nazivMeseca;
            br.ratingPerWeek = listReservationWeek.Count().ToString();
            br.StartDayOdWeek = startOfWeek.ToString().Split(" ")[0];
            br.EndDayOdWeek = endOfWeek.ToString().Split(" ")[0];
            br.CarsCount = noFlights.ToString();
            retVal.Add(br);





            return retVal;
        }

        [HttpGet]
        [Route("GetIncomeReportForCompany/{id}")]
        public async Task<ActionResult<IEnumerable<IncomeReport>>> GetIncomeReportForCompany(int id)
        {
            List<IncomeReport> listIncomeReport = new List<IncomeReport>();
            IncomeReport ir = new IncomeReport();
            DateTimeFormatInfo mfi = new DateTimeFormatInfo();

            List<Flight> flightsForCompany = context.Aircompanies.Include(x => x.Flights).SingleOrDefault(x => x.Id == id).Flights;
            var rez = context.FlightReservations.ToList();

            rez.RemoveAll(x => !flightsForCompany.Any(p => p.Id == x.FlightId));
            var today = DateTime.Today;
            var godina = CultureInfo.InvariantCulture.Calendar.GetYear(DateTime.Now);
            var mesec = new DateTime(today.Year, today.Month, 1);

            var nazivMeseca3start = mfi.GetMonthName(mesec.AddMonths(-3).Month).ToString();
            var nazivMeseca3end = mfi.GetMonthName(mesec.AddMonths(-1).Month).ToString();
            double godisnjiPrihod = 0;
            double TriMesecaPrihod = 0;
            double tekuciMesec = 0;
            double SestMesecaPrihod = 0;


            var month = new DateTime(today.Year, today.Month, 1);
            var previous = month.AddMonths(-1);
            var previous2 = month.AddMonths(-10);
            var n = previous.Month;

            foreach (var pom in rez)
            {

                Flight f = context.Flights.SingleOrDefault(x => x.Id == pom.FlightId);
                FlightSeat seat = context.FlightSeats.SingleOrDefault(x => x.Id == pom.SeatId);

                if (godina == f.TakeOff.Year)
                {
                    if (godina == f.TouchDown.Year)
                    {
                        godisnjiPrihod += seat.Price;
                    }
                }

                if (f.TakeOff.Month == month.AddMonths(-1).Month || f.TakeOff.Month == month.AddMonths(-2).Month || f.TakeOff.Month == month.AddMonths(-3).Month)
                {
                    if (f.TouchDown.Month == month.AddMonths(-1).Month || f.TouchDown.Month == month.AddMonths(-2).Month || f.TouchDown.Month == month.AddMonths(-3).Month)
                    {
                        TriMesecaPrihod += seat.Price;
                    }
                }

                if (f.TakeOff.Month == month.AddMonths(-1).Month || f.TakeOff.Month == month.AddMonths(-2).Month || f.TakeOff.Month == month.AddMonths(-3).Month || f.TakeOff.Month == month.AddMonths(-4).Month || f.TakeOff.Month == month.AddMonths(-5).Month || f.TakeOff.Month == month.AddMonths(-6).Month)
                {
                    if (f.TouchDown.Month == month.AddMonths(-1).Month || f.TouchDown.Month == month.AddMonths(-1).Month || f.TouchDown.Month == month.AddMonths(-1).Month || f.TouchDown.Month == month.AddMonths(-4).Month || f.TouchDown.Month == month.AddMonths(-5).Month || f.TouchDown.Month == month.AddMonths(-6).Month)
                    {
                        SestMesecaPrihod += seat.Price;
                    }
                }

                if (f.TakeOff.Month == month.Month && f.TouchDown.Month == month.Month)
                {
                    tekuciMesec += seat.Price;
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


    }
}