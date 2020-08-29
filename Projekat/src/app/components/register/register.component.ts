import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration-service/registration.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  constructor(private registration: RegistrationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'confirmPassword': new FormControl(null, [Validators.required]),
    });
  }

  get f() { return this.registerForm.controls; }

  onRegister() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log(this.registerForm.value);


    this.registration.addUser(this.registerForm.value).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        
        //alert((err as HttpErrorResponse).message);
        alert("Incorrect registration! Check your password or change your email!");
      }
    );
    this.submitted = false;
    this.registerForm.reset();
  }

}
