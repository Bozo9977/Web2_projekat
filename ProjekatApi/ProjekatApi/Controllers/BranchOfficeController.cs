using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.EC2.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProjekatApi.FormModel;
using ProjekatApi.Model;

namespace ProjekatApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchOfficeController : ControllerBase
    {
        private readonly DatabaseContext context;
        public BranchOfficeController(DatabaseContext _context)
        {
            context = _context;

        }

        [HttpPost]
        [Route("AddBranchOffice")]
        public async Task<IActionResult> AddBranchOffice(BranchOfficeForm branchOffices)
        {
            BranchOffices bo = new BranchOffices()
            {
                Name = branchOffices.Name,
                Address = branchOffices.Address,
                City = branchOffices.City,
                Telephone = branchOffices.Telephone.ToString()
            };

            CarCompany carCompany = new CarCompany();

            carCompany = context.Carcompanies.Find(branchOffices.IdCompany);

            bo.Id_company = carCompany;



            context.BranchOffices.Add(bo);

            await context.SaveChangesAsync();

            context.Entry(carCompany).State = EntityState.Modified;

            return Ok();
        }

        [HttpPut]
        [Route("UpdateBranchOffice")]
        public async Task<IActionResult> UpdateBranchOffice(BranchOfficeForm branchOffices)
        {
            BranchOffices branch = new BranchOffices();
            branch.Id = Int32.Parse(branchOffices.Id);
            branch.Name = branchOffices.Name;
            branch.Telephone = branchOffices.Telephone.ToString();
            branch.Address = branchOffices.Address;
            branch.City = branchOffices.City;
            context.Entry(branch).State = EntityState.Modified;

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
        [Route("GetBranchOffice/{id}")]
        public async Task<ActionResult<BranchOfficeForm>> GetBranchOffice(int id)
        {

            var bo = await context.BranchOffices.FindAsync(id);

            BranchOfficeForm bof = new BranchOfficeForm()
            {
                Name = bo.Name,
                City = bo.City,
                Address = bo.Address,
                Id = bo.Id.ToString(),
                Telephone = Int32.Parse(bo.Telephone)
            };

            if (bo == null)
            {
                return NotFound();
            }

            return bof;
        }

        [HttpGet]
        [Route("GetAllBranchOffices")]
        public async Task<ActionResult<IEnumerable<BranchOfficeGet>>> GetAllBranchOffices()
        {
            List<BranchOfficeGet> bf = new List<BranchOfficeGet>();

            var pom = context.BranchOffices.Include(x => x.Id_company).ToList();

            if(pom.Count() != 0)
            {
                foreach (var v in pom)
                {
                    BranchOfficeGet b = new BranchOfficeGet();
                    b.Id = v.Id.ToString();
                    b.Name = v.Name;
                    b.Address = v.Address;
                    b.City = v.City;
                    b.Rating = v.Id_company.AverageRating.ToString();
                    b.Telephone = Int32.Parse(v.Telephone);
                    b.IdCompany = v.Id_company.Id;
                    bf.Add(b);
                }
            }



            var pomCarC = context.Carcompanies.ToList();

            if(pomCarC.Count() != 0 )
            {
                foreach (var pomv in pomCarC)
                {
                    if(pom.Count() != 0)
                    {
                        var find = pom.Find(x => x.Id_company.Id == pomv.Id);
                        if(find == null)
                        {
                            BranchOfficeGet b = new BranchOfficeGet();
                            b.Name = pomv.Name;
                            b.City = pomv.Address;
                            b.Rating = pomv.AverageRating.ToString();
                            b.IdCompany = pomv.Id;
                            bf.Add(b);
                        }
                    }

                }
            }



            return bf;
        }

        [HttpGet]
        [Route("GetAllCities")]
        public async Task<ActionResult<IEnumerable<BranchOfficeGet>>> GetAllCities()
        {
            List<BranchOfficeGet> bf = new List<BranchOfficeGet>();

            var pom = context.BranchOffices.Include(x => x.Id_company).ToList();

            var pomCom = context.Carcompanies.ToList();

            foreach (var v in pom)
            {
                if(bf.Count() != 0)
                {
                    var postoji = bf.Find(x => x.City.ToLower() == v.City.ToLower());
                    if (postoji == null)
                    {
                        BranchOfficeGet b = new BranchOfficeGet();
                        b.Id = v.Id.ToString();
                        b.Name = v.Name;
                        b.City = v.City;
                        bf.Add(b);
                    }
                }
                else
                {
                    BranchOfficeGet b = new BranchOfficeGet();
                    b.Id = v.Id.ToString();
                    b.Name = v.Name;
                    b.City = v.City;
                    bf.Add(b);
                }

            }

            foreach (var v in pomCom)
            {
                if (bf.Count() != 0)
                {
                    var postoji = bf.Find(x => x.City.ToLower() == v.Address.ToLower());
                    if (postoji == null)
                    {
                        BranchOfficeGet b = new BranchOfficeGet();
                        b.Id = v.Id.ToString();
                        b.Name = v.Name;
                        b.City = v.Address;
                        bf.Add(b);
                    }
                }
                else
                {
                    BranchOfficeGet b = new BranchOfficeGet();
                    b.Id = v.Id.ToString();
                    b.Name = v.Name;
                    b.City = v.Address;
                    bf.Add(b);
                }

            }

            return bf;
        }

        [HttpGet]
        [Route("GetBranchOfficeForCompany/{IdCompany}")]
        public async Task<ActionResult<IEnumerable<BranchOffices>>> GetBranchOfficeForCompany(int IdCompany)
        {
            return context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Id == IdCompany).BranchOffices.ToList();

        }

        [HttpGet]
        [Route("GetBranchOfficeForSelect/{IdBO}")]
        public async Task<ActionResult<IEnumerable<BranchOffices>>> GetBranchOfficeForSelect(string IdBO)
        {
            

            var pom = context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Id == Int32.Parse(IdBO)).BranchOffices.ToList();


            return pom;

        }

        [HttpPost]
        [Route("SearchCompany")]
        public async Task<ActionResult<IEnumerable<BranchOffices>>> SearchCompany(SearchCompany searchCompany)
        {
            List<BranchOffices> listOffice = new List<BranchOffices>();
            //var pom = context.Carcompanies.Include(x => x.BranchOffices).ToList();
            // var pom1 = context.BranchOffices.Include(x=>x.Id_company).ToList().SingleOrDefault(x => x.Name == searchCompany.ServiceName);
           // var pom1 = "";
            if (searchCompany.ServiceName != "" && searchCompany.Location == "")
            {
                if(context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Name.ToLower() == searchCompany.ServiceName.ToLower()) != null)
                {
                    var pom1 = context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Name.ToLower() == searchCompany.ServiceName.ToLower()).BranchOffices.ToList();
                    listOffice = pom1;
                }
                else
                {
                    
                    listOffice = null;
                }
                
            }
            else if(searchCompany.ServiceName == "" && searchCompany.Location != "")
            {
                var pom = context.BranchOffices.ToList();

                var pom1 = pom.FindAll(x => x.City.ToLower() == searchCompany.Location.ToLower()).ToList();
                listOffice = pom1;
            }

            else if(searchCompany.ServiceName != "" && searchCompany.Location != "")
            {
              
                if(context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Name.ToLower() == searchCompany.ServiceName.ToLower()) != null)
                {
                    var pom1 = context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Name.ToLower() == searchCompany.ServiceName.ToLower()).BranchOffices.ToList();
                    var pom = pom1.FindAll(x => x.City.ToLower() == searchCompany.Location.ToLower()).ToList();

                    listOffice = pom;
                }
                else
                {
                    listOffice = null;
                }

            }

            return listOffice;
        }

    }
}