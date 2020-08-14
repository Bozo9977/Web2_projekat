import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl, NgForm } from '@angular/forms';
import { User } from 'src/app/entities/user/user';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {


  loggedInUser : User;
  userInfoForm: FormGroup

  constructor() { }

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
      'phone': new FormControl(''),
      'city': new FormControl(''),
      'password': new FormControl(''),
      'passwordConfirm': new FormControl()
    });
    this.userInfoForm.patchValue(this.loggedInUser);
  }

  changeUserInfo(){
    console.log(this.userInfoForm.value);
    console.log(this.userInfoForm);
    this.resetForm();
  }

  resetForm(){
    console.log('reset successfull');
    this.userInfoForm.reset();
  }


  checkPassword(){
    
  }
}
