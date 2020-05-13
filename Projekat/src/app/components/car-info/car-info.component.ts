import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  addCarForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.addCarForm = new FormGroup({
      'code': new FormControl(''),
      'mark': new FormControl(''),
      'yearProduction': new FormControl(''),
      'fuel': new FormControl(''),
      'gearshift': new FormControl(''),
      'seat': new FormControl(''),
      'door': new FormControl(''),
      'airConditioning': new FormControl(''),
      'status': new FormControl(''),
      'imageCar': new FormControl(''),
    });
  }

  onAddCar() {
    //.log(id);
    console.log(this.addCarForm);
  }

}
