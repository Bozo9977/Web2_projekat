import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { CarCompany } from 'src/app/entities/car-company/car-company';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  companyInfoForm: FormGroup;
  loggedInUser : User;
  company;

  constructor() { }

  ngOnInit(): void {

    this.company = JSON.parse(localStorage.getItem('company'));
    /*this.companyPom.name = JSON.parse(this.company.name);
    this.companyPom.address = JSON.parse(this.company.address);
    this.companyPom.description = JSON.parse(this.company.description);
    this.companyPom.id = JSON.parse(this.company.id);
    this.companyPom.rating = 10;*/
    console.log(this.company);
    this.initForm();
  }


  private initForm() {
    this.companyInfoForm = new FormGroup({
      'name': new FormControl(''),
      'address': new FormControl(''),
      'description': new FormControl(''),
    });
    this.companyInfoForm.patchValue(this.company);
  }

  changeCompany() {
    console.log(this.companyInfoForm.value);
    console.log(this.companyInfoForm);
  }

}
