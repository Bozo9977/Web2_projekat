import { Component, OnInit } from '@angular/core';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rent-a-car-services',
  templateUrl: './rent-a-car-services.component.html',
  styleUrls: ['./rent-a-car-services.component.css']
})
export class RentACarServicesComponent implements OnInit {

  branchPom: Array<BranchOffice>;
  searchCompanyForm: FormGroup;
  listCompany: Array<CarCompany>;
  listCities: Array<BranchOffice>;
  constructor(private branch: BranchOfficeService, private companies: CompanyService) { }



  ngOnInit(): void {
    this.loadBranchOffice();
    this.getCompanies();
    this.getCities();
    this.searchCompanyForm = new FormGroup({
      'serviceName': new FormControl(''),
      'location': new FormControl(''),
    });
  }

  private loadBranchOffice(){
    this.branch.getAllBO().subscribe(
      (res: any) => { 
        this.branchPom = res as BranchOffice[]
        console.log(this.branchPom);
      },
      err => {
        console.log(err);
      }
    );
  }
  
  private getCompanies()
  {
    this.companies.loadCarCompanies().subscribe(
      (res: any) => { 
        this.listCompany = res as CarCompany[]
        console.log("LIST COMPANY:", this.listCompany);
      },
      err => {
        console.log(err);
      }
    );   
  }

  private getCities()
  {
    this.companies.getAllCities().subscribe(
      (res: any) => { 
        this.listCities = res as BranchOffice[]
        console.log("LIST COMPANY:", this.listCities);
      },
      err => {
        console.log(err);
      }
    );   
  }

  onSearchCompany()
  {
    console.log(this.searchCompanyForm.value);
    this.branch.searchCompany(this.searchCompanyForm.value).subscribe(
      (res: any) => { 
        this.branchPom = res as BranchOffice[]
        console.log(this.branchPom);
       },
      err => {
        console.log(err);
      }
    );
  }

}
