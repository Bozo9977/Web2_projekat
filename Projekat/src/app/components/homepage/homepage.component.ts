import { Component, OnInit } from '@angular/core';
import { UserService} from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    /* 
    this.userService.login(this.loginForm.value).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/mainPage');
      },
      err =>{
        console.log(err.status);
        console.log(err);
      }
    ); */
    console.log("Ended submit");
  }

  newRentACarClicked(){
    this.rentACarClicked = !this.rentACarClicked;
  }

}
