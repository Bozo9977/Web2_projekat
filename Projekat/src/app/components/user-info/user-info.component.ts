import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, NgForm, Validators } from '@angular/forms';
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
  friendsVisible: boolean;
  userInfoForm: FormGroup

  constructor(private userService: UserService, private location: Location) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('userDetails'));
    if(localStorage.getItem('userType') != "RegisteredUser")
      this.friendsVisible = false;
    else
      this.friendsVisible = true;
    console.log(this.loggedInUser);
    this.initForm()
  }

  private initForm(){
    this.userInfoForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required]),
      'lastName': new FormControl('',[Validators.required]),
      'email': new FormControl('',[Validators.required, Validators.email]),
      'phoneNumber': new FormControl('',[Validators.required, Validators.maxLength(10),Validators.minLength(10)]),
      'city': new FormControl('',[Validators.required]),
      'password': new FormControl('', Validators.required),
      'passwordConfirm': new FormControl('',[Validators.required])
    });
    this.userInfoForm.patchValue(this.loggedInUser);
  }

  changeUserInfo(){
    console.log(this.userInfoForm.value);
    

    
    if(!this.userInfoForm.valid)
    {
      if(!this.userInfoForm.get('firstName').valid)
        alert("First name required");
      else if(!this.userInfoForm.get('lastName').valid)
        alert("Last name required");
      else if(!this.userInfoForm.get('phoneNumber').valid){
        if(this.userInfoForm.get('phoneNumber').value == "")
          alert("You must enter phone number");
        else if(this.userInfoForm.get('phoneNumber').value.length!=10)
          alert("Phone number must have 10 digits.")
      }      
      else if(!this.userInfoForm.get('password').valid)
        alert("You must enter a password");
      else if(!this.userInfoForm.get('passwordConfirm').valid)
        alert("You must enter a confirmation password");
     
    }
    else  if(this.userInfoForm.get('password').value != this.userInfoForm.get('passwordConfirm').value)
      alert('Password and confirmation password mismatch!');
    else
    {
      var user: User = this.userInfoForm.value;
    
      var decode = jwt_decode(localStorage.getItem('token'));
      user.id = decode['UserID'];

      this.userService.changeUserInfo(user).subscribe(
        (res: any) => {
          this.location.back();
        },
        err =>{
          console.log(err);
          console.log(JSON.stringify(err))
        }
      )
    }


    


    
  }

  resetForm(){
    this.location.back();
  }


  checkPassword(){
    
  }
}
