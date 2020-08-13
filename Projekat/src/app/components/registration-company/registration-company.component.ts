import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/services/registration-service/registration.service';

@Component({
  selector: 'app-registration-company',
  templateUrl: './registration-company.component.html',
  styleUrls: ['./registration-company.component.css']
})
export class RegistrationCompanyComponent implements OnInit {

  companyRegistrationForm: FormGroup;

  constructor(private companyService: CompanyService, private registrationService: RegistrationService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {

    this.companyRegistrationForm = new FormGroup({
      'company': new FormControl('', [Validators.required]),
      'registrationNameService': new FormControl(''),
      'Email': new FormControl(''),
      'FirstName': new FormControl(''),
      'LastName': new FormControl(''),
      'City': new FormControl(''),
      'Password': new FormControl(''),
      'ConfirmPassword': new FormControl(''),
    });

  }

  onRegistration() {
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
    
    

    

    // this.router.navigate(['/administrator']);
    // this.companyRegistrationForm.reset();
  }

}
