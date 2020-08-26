import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AvailableCar } from 'src/app/entities/available-car';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';

@Component({
  selector: 'app-average-car',
  templateUrl: './average-car.component.html',
  styleUrls: ['./average-car.component.css']
})
export class AverageCarComponent implements OnInit {

  company;
  idCompany: number;
  carsPom: Array<AvailableCar>;

  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router) { 
    this.company = JSON.parse(localStorage.getItem('company'));
    this.idCompany = this.company.id;
  }

  ngOnInit(): void {
    this.getAverageCar();
  }

  private getAverageCar(){
    this.cars.getAverageForCar(this.idCompany).subscribe(
      (res: any) => { 
        this.carsPom = res as Array<AvailableCar>;
        console.log(this.carsPom);
      },
      err => {
        console.log(err);
      }
    );
  }

}
