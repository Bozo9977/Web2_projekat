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
      this.loadCars();
  }

  deleteCar(idCar: number) {
    this.cars.deleteCar(idCar).subscribe();
    }

    private loadCars(){
      this.cars.getCars().subscribe(
        (res: any) => { 
          this.carsList = res as Cars[] 
        },
        err => {
          console.log(err);
        }
      );
    } 
}
