import { Component, OnInit } from '@angular/core';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Cars } from 'src/app/entities/cars/cars';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SearchCar } from 'src/app/entities/searchCar/search-car';

@Component({
  selector: 'app-available-cars-view',
  templateUrl: './available-cars-view.component.html',
  styleUrls: ['./available-cars-view.component.css']
})
export class AvailableCarsViewComponent implements OnInit {

  id:number;
  availableCars: Array<Cars>
  availableCarsForm: FormGroup;
  car: SearchCar;

  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router) { 
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.loadCars();

    this.availableCarsForm = new FormGroup({
      'kategorija': new FormControl(''),
      'search': new FormControl(''),
    });
  }

  private loadCars(){
    this.cars.getCars(this.id).subscribe(
      (res: any) => { 
        this.availableCars = res as Cars[]
        console.log(this.availableCars);
      },
      err => {
        console.log(err);
      }
    );
  } 

  onSearchAvailableCars(){
    console.log(this.availableCarsForm.value);
    this.car = this.availableCarsForm.value;
    this.car.id = this.id;
    console.log(this.car);
    this.cars.searchCars(this.car).subscribe(
      (res: any) => { 
        this.availableCars = res as Cars[]
        console.log(this.availableCars);
       },
      err => {
        console.log(err);
      }
    );
  }

}
