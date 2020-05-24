import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';

@Component({
  selector: 'app-car-info',
  templateUrl: './car-info.component.html',
  styleUrls: ['./car-info.component.css']
})
export class CarInfoComponent implements OnInit {

  addCarForm: FormGroup;

  constructor(private cars: CarsServiceService) { }

  ngOnInit(): void {
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
    console.log(this.addCarForm);
    this.cars.addCar(this.addCarForm.value).subscribe(
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
