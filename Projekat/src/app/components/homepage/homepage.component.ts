import { Component, OnInit } from '@angular/core';
import { UserService} from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { CompanyService } from 'src/app/services/company-service/company.service';
import { CarCompany } from 'src/app/entities/car-company/car-company';
import { Aircompany } from 'src/app/entities/aircompany/aircompany';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  rentACarClicked: boolean = true;
  loginForm: FormGroup;
  userDetails;
  company: CarCompany;
  aircompany: Aircompany;

  formModel = {
    Username: '',
    Password : ''
  }

  constructor(private userService: UserService, private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();

  }


  private initForm() {
    this.loginForm = new FormGroup({
      'Username': new FormControl(''),
      'Password': new FormControl('')
    });
  }

  onSubmit(){
    console.log("started submit");
    console.log(this.loginForm.value);
    
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);

        
        var decode = jwt_decode(res.token);
        var givenName = decode['Roles'];

        var UserID = decode['UserID'];
        localStorage.setItem('userType', givenName);
        
        if(givenName == "RegisteredUser")
          this.router.navigateByUrl('/mainPage');
        else if(givenName == "Administrator")
          this.router.navigateByUrl('/administrator');
        else if(givenName == "AirlineAdministrator")
        {
          this.companyService.getAirCompanyForUser(UserID).subscribe(
            (res:any)=>{
              this.aircompany = new Aircompany(res.id, res.name, res.address, res.description, res.averageRating);
              console.log("AIRCOMPANY: ", this.aircompany)
              localStorage.setItem('company', JSON.stringify(this.aircompany));
              console.log(res);
              this.router.navigateByUrl('/aircompany_admin');
            },
            err =>{
              console.log(err.status);
              console.log(err);
            }
          );
          
        }          
        else if(givenName == "CarAdministrator")
        {
          this.companyService.getCarCompanyForUser(UserID).subscribe(
            (res:any)=>{

              this.company = new CarCompany(res.id, res.name, res.address, res.description, res.rating);

              console.log("CARCOMPANY: ", this.company );
              localStorage.setItem('company', JSON.stringify(this.company));
              
              this.router.navigateByUrl('/rent-a-car-Admin');
            },
            err =>{
              console.log(err.status);
              console.log(err);
            }
          );
        }

        this.userService.getUserProfile().subscribe(
          res => {
            this.userDetails = res;
            localStorage.setItem('userDetails', JSON.stringify(res));
            console.log(this.userDetails);
            console.log(this.userDetails.firstName);
          },
          err => {
            console.log(err);
          },
        );
      },
      err =>{
        console.log(err.status);
        console.log(err);
      }
    ); 
    console.log("Ended submit");
  }

  newRentACarClicked(){
    this.rentACarClicked = !this.rentACarClicked;
  }

}
