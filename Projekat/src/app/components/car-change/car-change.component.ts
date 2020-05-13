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
  
  constructor(private cars: CarsServiceService) { }
  

  ngOnInit(): void {
    this.carsList = this.cars.loadCars();
  }

  deleteCar(idCar: number) {
    this.carsList.splice(this.carsList.findIndex(x => x.id == idCar), 1);
    //window.location.reload();
    console.log(idCar);
    }

}
