import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  addAdminForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.addAdminForm = new FormGroup({
      'emailAdmin': new FormControl(''),
      'firstNameAdmin': new FormControl(''),
      'lastNameAdmin': new FormControl(''),
      'passwordAdmin': new FormControl(''),
      'password2Admin': new FormControl(''),
      'cityAdmin': new FormControl(''),
    });
  }

  onAddAdmin() {
    console.log(this.addAdminForm.value);
    console.log(this.addAdminForm);
  }

}
