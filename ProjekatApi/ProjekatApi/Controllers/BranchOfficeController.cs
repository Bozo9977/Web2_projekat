﻿using System;
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
        public async Task<IActionResult> AddBranchOffice(BranchOfficeForm branchOffices)
        {
            BranchOffices bo = new BranchOffices()
            {
                Name = branchOffices.Name,
                Address = branchOffices.Address,
                City = branchOffices.City,
                Telephone = branchOffices.Telephone
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
        [Route("GetBranchOffice/{id}")]
        public async Task<ActionResult<BranchOffices>> GetBranchOffice(int id)
        {

            var bo = await context.BranchOffices.FindAsync(id);

            if (bo == null)
            {
                return NotFound();
            }

            return bo;
        }

        [HttpGet]
        [Route("GetAllBranchOffices")]
        public async Task<ActionResult<IEnumerable<BranchOffices>>> GetAllBranchOffices()
        {

            return context.BranchOffices.ToList();
        }

        [HttpGet]
        [Route("GetBranchOfficeForCompany/{IdCompany}")]
        public async Task<ActionResult<IEnumerable<BranchOffices>>> GetBranchOfficeForCompany(int IdCompany)
        {
            return context.Carcompanies.Include(x => x.BranchOffices).ToList().SingleOrDefault(x => x.Id == IdCompany).BranchOffices.ToList();

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