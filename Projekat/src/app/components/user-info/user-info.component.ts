import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, NgForm } from '@angular/forms';
import { User } from 'src/app/entities/user/user';
import { UserService } from 'src/app/services/user-service/user.service';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {


  loggedInUser : User;
  userInfoForm: FormGroup

  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('userDetails'));
    console.log(this.loggedInUser);
    this.initForm()
  }

  private initForm(){
    this.userInfoForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'email': new FormControl(''),
      'phoneNumber': new FormControl(''),
      'city': new FormControl(''),
      'password': new FormControl(''),
      'passwordConfirm': new FormControl()
    });
    this.userInfoForm.patchValue(this.loggedInUser);
  }

  changeUserInfo(){
    console.log(this.userInfoForm.value);
    
    var user: User = this.userInfoForm.value;
    
    var decode = jwt_decode(localStorage.getItem('token'));
    user.id = decode['UserID'];

    console.log("User info change: " + user);

    if(this.userInfoForm.get('password').value != this.userInfoForm.get('passwordConfirm').value)
    {
      console.log("PAssword mismatch");
    }else
    {
      this.userService.changeUserInfo(user).subscribe(
        (res: any) => {
          this.location.back();
        },
        err =>{
          console.log(err);
        }
      )
    }

    
  }

  resetForm(){
    console.log('reset successfull');
    this.userInfoForm.reset();
  }


  checkPassword(){
    
  }
}
