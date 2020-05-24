using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [Route("UpdateBranchOffice")]
        public async Task<IActionResult> UpdateBranchOffice(BranchOffices branchOffices)
        {

            context.Entry(branchOffices).State = EntityState.Modified;

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