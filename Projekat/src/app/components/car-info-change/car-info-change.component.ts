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
  submitted = false;
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
        this.changeCarForm.setValue({ mark: this.carPom.mark, yearProduction: this.carPom.yearProduction, fuel: this.carPom.fuel, gearshift: this.carPom.gearshift, seat: this.carPom.seat, door: this.carPom.door, airConditioning: this.carPom.airConditioning, bags: this.carPom.bags, rentPerDay: this.carPom.rentPerDay, imageCar: ""});
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

  get f() { return this.changeCarForm.controls; }

  private initForm() {
    this.changeCarForm = new FormGroup({
      'mark': new FormControl(null, [Validators.required]),
      'yearProduction': new FormControl(null, [Validators.required, Validators.max(2020), Validators.min(2005) ]),
      'fuel': new FormControl(null, [Validators.required]),
      'gearshift': new FormControl(null, [Validators.required]),
      'seat': new FormControl(null, [Validators.required, Validators.max(8), Validators.min(2)]),
      'door': new FormControl(null, [Validators.required, Validators.max(5), Validators.min(2)]),
      'airConditioning': new FormControl(null, [Validators.required]),
      'bags': new FormControl(null, [Validators.required, Validators.max(8), Validators.min(1)]),
      'rentPerDay': new FormControl(null, [Validators.required, Validators.max(15000), Validators.min(1500)]),
      'imageCar': new FormControl(null, [Validators.required]),
    });
    
  }

  onChangeCar() {

    this.submitted = true;

    if (this.changeCarForm.invalid) {
        return;
    }

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
    this.submitted = false;
    this.changeCarForm.reset();

  }
}
