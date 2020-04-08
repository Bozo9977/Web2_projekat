import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'registerFirstName': new FormControl(''),
      'registerLastName': new FormControl(''),
      'registerCity': new FormControl(''),
      'registerEmail': new FormControl(''),
      'registerPassword': new FormControl(''),
      'registerConfirmPassword': new FormControl(''),
    });
  }

  onRegister() {
    console.log(this.registerForm.value);
    console.log(this.registerForm);
  }

}
