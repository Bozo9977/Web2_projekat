import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company-service/company.service';

@Component({
  selector: 'app-registration-company',
  templateUrl: './registration-company.component.html',
  styleUrls: ['./registration-company.component.css']
})
export class RegistrationCompanyComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private company: CompanyService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = new FormGroup({
      'company': new FormControl('', [Validators.required]),
      'registrationNameService': new FormControl(''),
      'registrationEmail': new FormControl(''),
      'registrationFirstName': new FormControl(''),
      'registrationLastName': new FormControl(''),
      'registrationCity': new FormControl(''),
      'registrationPassword': new FormControl(''),
      'registrationConfirmPassword': new FormControl(''),
    });
  }

  onRegistration() {
    console.log(this.registrationForm.value);
    this.company.addCompany(this.registrationForm.value).subscribe(
      (res: any) => {
        console.log(res);
        
      },
      err =>{
        console.log(err);
      }
    );
    this.registrationForm.reset();
  }

}
