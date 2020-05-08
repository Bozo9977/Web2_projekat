import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit {

  companyInfoForm: FormGroup;


  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }


  private initForm() {
    this.companyInfoForm = new FormGroup({
      'nameService': new FormControl(''),
      'address': new FormControl(''),
      'description': new FormControl(''),
    });
  }

  changeCompany() {
    console.log(this.companyInfoForm.value);
    console.log(this.companyInfoForm);
  }

}
