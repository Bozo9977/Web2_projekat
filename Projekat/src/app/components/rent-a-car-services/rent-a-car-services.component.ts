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
  constructor(private branch: BranchOfficeService) { }



  ngOnInit(): void {
    this.loadBranchOffice();
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
