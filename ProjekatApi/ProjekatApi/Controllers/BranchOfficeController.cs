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
    public class BranchOfficeController : ControllerBase
    {
        private readonly DatabaseContext context;
        public BranchOfficeController(DatabaseContext _context)
        {
            context = _context;

        }

        [HttpPost]
        [Route("AddBranchOffice")]
        public async Task<IActionResult> AddBranchOffice(BranchOffices branchOffices)
        {


            CarCompany carCompany = new CarCompany();

            carCompany = context.Carcompanies.Find(1);

            carCompany.BranchOffices = new List<BranchOffices>();

            branchOffices.Id_company = carCompany;

            carCompany.BranchOffices.Add(branchOffices);




            await context.SaveChangesAsync();

            context.Entry(carCompany).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut]
        [Route("UpdateBranchOffice")]
        public async Task<IActionResult> UpdateBranchOffice(BranchOfficeForm branchOffices)
        {
            BranchOffices branch = new BranchOffices();
            branch.Id = Int32.Parse(branchOffices.Id);
            branch.Name = branchOffices.Name;
            branch.Telephone = branchOffices.Telephone;
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
        [Route("GetBranchOffice")]
        public async Task<ActionResult<IEnumerable<BranchOffices>>> GetBranchOffice()
        {

            return context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Id == 1).BranchOffices.ToList();
        }

    }
}