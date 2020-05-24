import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cars } from 'src/app/entities/cars/cars';
import { ActivatedRoute } from '@angular/router';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-info-change',
  templateUrl: './car-info-change.component.html',
  styleUrls: ['./car-info-change.component.css']
})
export class CarInfoChangeComponent implements OnInit {
  changeCarForm: FormGroup;
  carPom: Cars;
  id: string;
  carsList: Array<Cars>;
  carSend: Cars;

  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router) {
    route.params.subscribe(params => { this.id = params['id']; });
    console.log(this.id);
    this.loadCar();
    //this.changeCarForm.setValue({ mark: this.carPom.mark, yearProduction: this.carPom.yearProduction, fuel: this.carPom.fuel, gearshift: this.carPom.gearshift, seat: this.carPom.seat, door: this.carPom.door, airConditioning: this.carPom.airConditioning, bags: this.carPom.bags,  status: this.carPom.airConditioning, hourlyRent: this.carPom.status, rentPerDay: this.carPom.hourlyRent, imageCar: ""});
   }

   private loadCar(){
    this.cars.getOneCar(this.id).subscribe(
      (res: any) => { 
        this.carPom = res as Cars
        console.log(this.carPom);
        this.changeCarForm.setValue({ mark: this.carPom.mark, yearProduction: this.carPom.yearProduction, fuel: this.carPom.fuel, gearshift: this.carPom.gearshift, seat: this.carPom.seat, door: this.carPom.door, airConditioning: this.carPom.airConditioning, bags: this.carPom.bags,  status: this.carPom.airConditioning, hourlyRent: this.carPom.status, rentPerDay: this.carPom.hourlyRent, imageCar: ""});
      },
      err => {
        console.log(err);
      }
    );
  } 

  ngOnInit(): void {
    this.initForm();
   // this.carsList = this.cars.loadCars();
    
  }

  private initForm() {
    this.changeCarForm = new FormGroup({
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

  onChangeCar() {
    this.carPom = this.changeCarForm.value;
    console.log(this.carPom);
    this.carSend = this.changeCarForm.value;
    this.carSend.id = this.id;

    console.log(this.changeCarForm);
    this.cars.updateCar(this.carSend).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
    this.changeCarForm.reset();

  }
}
