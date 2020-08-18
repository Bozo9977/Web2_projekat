import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { CompanyService } from 'src/app/services/company-service/company.service';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  companyInfoForm: FormGroup;
  loggedInUser : User;
  company;
  companyPom: CarCompany;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {

    this.company = JSON.parse(localStorage.getItem('company'));
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
    console.log("IZMENA: ", this.companyInfoForm.value);

    
    this.companyPom = this.companyInfoForm.value;
    this.companyPom.id = this.company.id;
    

    this.companyService.updateCompanyService(this.companyPom).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
    this.companyInfoForm.reset();
  }

}
