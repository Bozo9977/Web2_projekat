import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-company',
  templateUrl: './registration-company.component.html',
  styleUrls: ['./registration-company.component.css']
})
export class RegistrationCompanyComponent implements OnInit {

  registrationForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registrationForm = new FormGroup({
      'company': new FormControl(''),
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
    console.log(this.registrationForm);
  }

}
