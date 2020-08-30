import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AvailableCar } from 'src/app/entities/available-car';
import { ReservationCars } from 'src/app/entities/reservationCar/reservation-cars';
import { BranchOffice } from 'src/app/entities/branch-office/branch-office';
import { BranchOfficeService } from 'src/app/services/branchOffice-service/branch-office.service';

@Component({
  selector: 'app-available-cars',
  templateUrl: './available-cars.component.html',
  styleUrls: ['./available-cars.component.css']
})
export class AvailableCarsComponent implements OnInit {

  carsList: Array<AvailableCar>;
  id:string;
  searchAvailableCarsForm: FormGroup;
  availableCars: Array<AvailableCar>
  company;
  idCompany:number;
  reservationCar: ReservationCars;
  selectedCities: Array<BranchOffice>;
  user;
  submitted = false;

  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router, private branch: BranchOfficeService) {
    route.params.subscribe(params => { this.id = params['id']; });
    console.log(this.id);
  }

  ngOnInit(): void {
    this.loadCars();
    this.selectCity();
    this.user = JSON.parse(localStorage.getItem('userDetails'));
    console.log(this.user);
    this.searchAvailableCarsForm = new FormGroup({
      'City1': new FormControl(null, [Validators.required]),
      'City2': new FormControl(null, [Validators.required]),
      'startDay' : new FormControl(null, [Validators.required]),
      'endDay': new FormControl(null, [Validators.required]),
      'Mark': new FormControl(null, [Validators.required]),
      'Number': new FormControl(null, [Validators.required, Validators.max(8), Validators.min(2)]),
    });
  }

  get f() { return this.searchAvailableCarsForm.controls; }

  private selectCity(){
    this.branch.getBranchOfficeForSelect(this.id).subscribe(
      (res: any) => { 
        this.selectedCities = res as BranchOffice[]
        console.log(this.selectedCities);
      },
      err => {
        console.log(err);
      }
    );
  } 

  private loadCars(){
    this.cars.getAllCars(this.id).subscribe(
      (res: any) => { 
        this.carsList = res as AvailableCar[]
        console.log(this.carsList);
      },
      err => {
        console.log(err);
      }
    );
  } 

  onSearchAvailableCars()
  {

    this.submitted = true;

    if (this.searchAvailableCarsForm.invalid) {
        return;
    }

    console.log(this.searchAvailableCarsForm.value);
    this.reservationCar = this.searchAvailableCarsForm.value;
    //id branchOffic-a
    console.log(this.idCompany);
    this.reservationCar.id = this.id;
    this.cars.searchAvailableCars(this.reservationCar).subscribe(
      (res: any) => { 
        this.carsList = res as AvailableCar[]
        console.log(this.availableCars);
       },
      err => {
        console.log(err);
      }
    );


  }

  newReservation(idCar: string){
    console.log(idCar);
    console.log(this.searchAvailableCarsForm.value);
    this.reservationCar = this.searchAvailableCarsForm.value;
    console.log(this.idCompany);
    this.reservationCar.id = idCar;
    this.reservationCar.idUser = this.user.id;
    this.cars.newReservationCar(this.reservationCar).subscribe(
      
      (res: any) => { 
        console.log(res);
       },
      err => {
        console.log(err);
      }
    );

    this.submitted = false;
    this.searchAvailableCarsForm.reset();
    this.routerPrim.navigateByUrl('/rentACarServices');
  }

}
