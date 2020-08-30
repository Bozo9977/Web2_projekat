import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';

@Component({
  selector: 'app-car-change',
  templateUrl: './car-change.component.html',
  styleUrls: ['./car-change.component.css']
})
export class CarChangeComponent implements OnInit {

  carsList: Array<Cars>;
  company;
  idCompany: number;
  constructor(private cars: CarsServiceService) { }
  

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('company'));
    console.log(this.company);
    this.idCompany = this.company.id;
    this.loadCars();
  }

  deleteCar(idCar: string) {
    console.log(idCar);
    this.cars.deleteCar(idCar).subscribe();
    this.loadCars();
    }



    private loadCars(){
      this.cars.getCars(this.idCompany).subscribe(
        (res: any) => { 
          this.carsList = res as Cars[] 
        },
        err => {
          console.log(err);
        }
      );
    } 
}