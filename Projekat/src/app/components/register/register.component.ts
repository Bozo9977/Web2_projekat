import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration-service/registration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private registration: RegistrationService) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'firstName': new FormControl(''),
      'lastName': new FormControl(''),
      'city': new FormControl(''),
      'email': new FormControl(''),
      'password': new FormControl(''),
      'confirmPassword': new FormControl(''),
    });
  }

  onRegister() {
    console.log(this.registerForm.value);

    this.registration.addUser(this.registerForm.value).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
    this.registerForm.reset();
  }

}
