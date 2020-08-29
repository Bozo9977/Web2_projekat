import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration-service/registration.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm: FormGroup;
  submitted = false;
  constructor(private registration: RegistrationService) { }

  ngOnInit(): void {
    this.initForm();
  }



  private initForm() {
    this.addAdminForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'city': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'phoneNumber': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'confirmPassword': new FormControl(null, [Validators.required]),
    });
  }

  get f() { return this.addAdminForm.controls; }

  onAddAdmin() {
    this.submitted = true;

    if (this.addAdminForm.invalid) {
      return;
    }
    this.registration.addSistemUser(this.addAdminForm.value).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        
        //alert((err as HttpErrorResponse).message);
        alert("Incorrect registration! Check your password or change your email!");
      }
    );
    this.submitted = false;
    this.addAdminForm.reset();
  }

}
