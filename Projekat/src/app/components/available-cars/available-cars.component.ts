import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-available-cars',
  templateUrl: './available-cars.component.html',
  styleUrls: ['./available-cars.component.css']
})
export class AvailableCarsComponent implements OnInit {

  carsList: Array<Cars>;
  id:string;

  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router) {
    route.params.subscribe(params => { this.id = params['id']; });
    console.log(this.id);
  }

  ngOnInit(): void {
    this.loadCars();
  }

  private loadCars(){
    this.cars.getAllCars(this.id).subscribe(
      (res: any) => { 
        this.carsList = res as Cars[]
        console.log(this.carsList);
      },
      err => {
        console.log(err);
      }
    );
  } 

}
