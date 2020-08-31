import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Cars } from 'src/app/entities/cars/cars';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  submitted = false;
  addCarForm: FormGroup;
  company;
  carToSend: Cars;
  constructor(private cars: CarsServiceService) { }

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('company'));
    console.log("CAR-INFO: ", this.company);
    this.initForm();
  }

  private initForm() {
    this.addCarForm = new FormGroup({
      'mark': new FormControl(null, [Validators.required]),
      'yearProduction': new FormControl(null, [Validators.required, Validators.max(2020), Validators.min(2005) ]),
      'fuel': new FormControl(null, [Validators.required]),
      'gearshift': new FormControl(null, [Validators.required]),
      'seat': new FormControl(null, [Validators.required, Validators.max(8), Validators.min(2)]),
      'door': new FormControl(null, [Validators.required, Validators.max(5), Validators.min(2)]),
      'airConditioning': new FormControl(null, [Validators.required]),
      'bags': new FormControl(null, [Validators.required, Validators.max(8), Validators.min(1)]),
      'rentPerDay': new FormControl(null, [Validators.required, Validators.max(15000), Validators.min(1500)]),
      'imageCar': new FormControl(null, [Validators.required]),
    });
  }

  get f() { return this.addCarForm.controls; }

  onAddCar() {
    this.submitted = true;
    console.log(this.addCarForm.value);

    if (!this.addCarForm.valid) {
      console.log(this.addCarForm.errors)
      return;
     
  }

    console.log(this.addCarForm.value);
    this.carToSend = this.addCarForm.value;
    this.carToSend.idCompany = this.company.id;
    console.log("ADD CAR:", this.carToSend);
    this.cars.addCar(this.carToSend).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
    this.submitted = false;
    this.addCarForm.reset();
  }

}
