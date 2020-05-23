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
  id: number;
  carsList: Array<Cars>;

  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router) {
    route.params.subscribe(params => { this.id = params['id']; });
    //this.carPom = this.cars.loadCars().find(x => x.id == this.id);
    
   }

  ngOnInit(): void {
    this.initForm();
    this.carsList = this.cars.loadCars();
    //this.changeCarForm.setValue({code: this.carPom.code, mark: this.carPom.mark, yearProduction: this.carPom.yearOfProduction, fuel: this.carPom.fuel, gearshift: this.carPom.gearshift, seat: this.carPom.seat, door: this.carPom.door, airConditioning: this.carPom.airConditioning, status: this.carPom.airConditioning, imageCar: ""});
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
      'status': new FormControl(''),
      'imageCar': new FormControl(''),
    });
    
  }

  onChangeCar() {
    this.carPom = this.changeCarForm.value;

    console.log(this.carPom);
    console.log("usao");
    //let index = this.carsList.findIndex(x => x.id == this.id);
   // this.carsList[index] = this.carPom;
    //this.cars.loadCars().find(x => x.id == this.id).id = this.carPom.id;
   // this.cars.loadCars().find(x => x.id == this.id).bags = this.carPom.bags;
   // this.cars.loadCars().find(x => x.id == this.id).code = this.carPom.code;
   // this.cars.loadCars().find(x => x.id == this.id).door = this.carPom.door;
   // this.cars.loadCars().find(x => x.id == this.id).fuel = this.carPom.fuel;
   // this.cars.loadCars().find(x => x.id == this.id).gearshift = this.carPom.gearshift;
   // this.cars.loadCars().find(x => x.id == this.id).hourlyRent = this.carPom.hourlyRent;
   // this.cars.loadCars().find(x => x.id == this.id).image = this.carPom.image;
   // this.cars.loadCars().find(x => x.id == this.id).mark = this.carPom.mark;
   // this.cars.loadCars().find(x => x.id == this.id).rentPerDay = this.carPom.rentPerDay;
   // this.cars.loadCars().find(x => x.id == this.id).seat = this.carPom.seat;
   // this.cars.loadCars().find(x => x.id == this.id).yearOfProduction = this.carPom.yearOfProduction;
   this.routerPrim.navigate(['carChange']);
    //this.route = "/addPrice";
    window.close();
  }
}
