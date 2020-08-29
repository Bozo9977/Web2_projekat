import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration-service/registration.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration-company',
  templateUrl: './registration-company.component.html',
  styleUrls: ['./registration-company.component.css']
})
export class RegistrationCompanyComponent implements OnInit {

  companyRegistrationForm: FormGroup;
  submitted = false;
  constructor(private companyService: CompanyService, private registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {

    this.companyRegistrationForm = new FormGroup({
      'company': new FormControl(''),
      'registrationNameService': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'confirmPassword': new FormControl(null, [Validators.required]),
    });

  }

  
  get f() { return this.companyRegistrationForm.controls; }

  onRegistration() {

    this.submitted = true;


    if (this.companyRegistrationForm.invalid) {
        return;
    }
    console.log(this.companyRegistrationForm.value);
    
    if(this.companyRegistrationForm.controls['company'].value != "carcompany"){
      this.registrationService.addAircompanyAddmin(this.companyRegistrationForm.value).subscribe(
        (res:any)=>{
          console.log(res);
  
          this.companyService.addCompany(this.companyRegistrationForm.value).subscribe(
            (res: any) => {
              console.log(res);
              this.router.navigate(['/administrator']);
            },
            err =>{
              console.log(err);
            }
          );
        },
        err =>{
          console.log(err);
        }
      );
    }

    else{
    // izmeniti za carcompany
    this.registrationService.addCarAddmin(this.companyRegistrationForm.value).subscribe(
      (res:any)=>{
        console.log(res);

        this.companyService.addCompany(this.companyRegistrationForm.value).subscribe(
          (res: any) => {
            console.log(res);
            this.router.navigate(['/administrator']);
          },
          err =>{
            console.log(err);
          }
        );
      },
      err =>{
        console.log(err);
      }
    );


    
    }
    
    

    

    // this.router.navigate(['/administrator']);
    // this.companyRegistrationForm.reset();
  }

}
