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
  carPom: SearchCar;
  submitted = false;

  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router) { 
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ngOnInit(): void {
    this.loadCars();

    this.availableCarsForm = new FormGroup({
      'kategorija': new FormControl(null, [Validators.required]),
      'search': new FormControl(null, [Validators.required]),
    });
  }

  get f() { return this.availableCarsForm.controls; }

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

    this.submitted = true;

    if (this.availableCarsForm.invalid) {
        return;
    }
    console.log(this.availableCarsForm.value);
    this.carPom = new SearchCar();
    this.car = this.availableCarsForm.value;
    this.car.IdComp = this.id;
    this.carPom.kategorija = this.car.kategorija;
    this.carPom.search = this.car.search;
    this.carPom.IdComp = this.car.IdComp;
    console.log(this.car);
    this.cars.searchCarsFunction(this.carPom).subscribe(
      (res: any) => { 
        this.availableCars = res as Cars[]
        console.log(this.availableCars);
       },
      err => {
        console.log(err);
      }
    );

    this.submitted = false;
    this.availableCarsForm.reset();
  }

}
