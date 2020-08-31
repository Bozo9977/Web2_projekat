import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration-service/registration.service';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-registracija-potvrda',
  templateUrl: './registracija-potvrda.component.html',
  styleUrls: ['./registracija-potvrda.component.css']
})
export class RegistracijaPotvrdaComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  user: User;
  userPom: User;
  code: number;
  constructor(private registration: RegistrationService) { }


  ngOnInit(): void {
    this.userPom = JSON.parse(localStorage.getItem('email'));

    this.registerForm = new FormGroup({
      'code': new FormControl(null, [Validators.required]),
    });
  }

  get f() { return this.registerForm.controls; }


  onConfirmEmail() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    console.log(this.registerForm.value);
    this.code = this.registerForm.value;
    this.user = this.registerForm.value;
    this.userPom.code = this.user.code;
    console.log(this.userPom);
    this.registration.confirmEmail(this.userPom).subscribe(
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
