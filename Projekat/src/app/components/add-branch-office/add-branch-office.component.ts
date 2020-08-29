import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { min } from 'moment';

@Component({
  selector: 'app-add-branch-office',
  templateUrl: './add-branch-office.component.html',
  styleUrls: ['./add-branch-office.component.css']
})
export class AddBranchOfficeComponent implements OnInit {

  constructor(private branch: BranchOfficeService, private companyService: CompanyService) { }

  company;
  addBranchOfficeForm: FormGroup;
  idCompany: number;
  branchOfficeToSend: BranchOffice;
  companyPom: CarCompany
  user;
  submitted = false;

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('company'));
    this.user = JSON.parse(localStorage.getItem('userDetails'));
    this.idCompany = this.company.id;
    this.initForm();
    console.log(this.addBranchOfficeForm.value);

    this.companyService.getCarCompanyForUser(this.user.id).subscribe(
      (res: any) =>{
        console.log(res);
        this.companyPom = res as CarCompany;
        console.log("VRACENA KOMPANIJA: ", this.company);
      },
      err =>{
        console.log(err);
      }
    )
    
  }

  private initForm() {
    this.addBranchOfficeForm = new FormGroup({
      'city': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'telephone': new FormControl(null, [Validators.required, Validators.min(6), Validators.max(10)]),
    });
  }

  get f() { return this.addBranchOfficeForm.controls; }

  onBranchOffice() {

    this.submitted = true;

    if (this.addBranchOfficeForm.invalid) {
        return;
    }

    this.branchOfficeToSend = this.addBranchOfficeForm.value;
    this.branchOfficeToSend.idCompany = this.idCompany;
    this.branchOfficeToSend.name = this.companyPom.name;
    console.log(this.branchOfficeToSend);
    this.branch.addBranchOffices(this.branchOfficeToSend).subscribe(
      (res: any) => {
        console.log(res);
        
      },
      err =>{
        console.log(err);
      }
    );
    this.submitted = false;
    this.addBranchOfficeForm.reset();
  }

}
