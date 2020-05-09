import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {


  userInfoForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(){
    this.userInfoForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'email': new FormControl(''),
      'phone': new FormControl(''),
      'password': new FormControl(''),
      'passwordConfirm': new FormControl()
    });
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
}
