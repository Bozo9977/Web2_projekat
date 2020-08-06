import { Component, OnInit } from '@angular/core';
import { UserService} from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  rentACarClicked: boolean = true;
  loginForm: FormGroup;

  formModel = {
    Username: '',
    Password : ''
  }

  constructor(private userService: UserService, private router: Router) { }

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

        if(givenName == "RegisteredUser")
          this.router.navigateByUrl('/mainPage');
        else if(givenName == "Administrator")
          this.router.navigateByUrl('/administrator');
        else if(givenName == "AirlineAdministrator")
          this.router.navigateByUrl('/aircompany_admin');
        else if(givenName == "CarAdministrator")
          this.router.navigateByUrl('/rent-a-car-Admin');
        console.log(decode);
        console.log(givenName);

      
        // this.router.navigateByUrl('/mainPage');
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
