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
      'mark': new FormControl(''),
      'yearProduction': new FormControl(''),
      'fuel': new FormControl(''),
      'gearshift': new FormControl(''),
      'seat': new FormControl(''),
      'door': new FormControl(''),
      'airConditioning': new FormControl(''),
      'bags': new FormControl(''),
      'status': new FormControl(''),
      'hourlyRent': new FormControl(''),
      'rentPerDay': new FormControl(''),
      'imageCar': new FormControl(''),
    });
  }

  onAddCar() {
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
    this.addCarForm.reset();
  }

}
