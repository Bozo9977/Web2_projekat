import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { MyFlightReservation } from 'src/app/entities/my-flight-reservation/my-flight-reservation';
import * as jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';
import { Rate } from 'src/app/entities/rate/rate';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in-user',
  templateUrl: './logged-in-user.component.html',
  styleUrls: ['./logged-in-user.component.css']
})
export class LoggedInUserComponent implements OnInit {
  bookFlight: boolean = true;
  aircompany: boolean = true;
  rentCar: boolean = true;
  carcompany: boolean = true;
  flightReservations: boolean = true;
  carReservations: boolean = true;

  myReservations: MyFlightReservation[] = [];
  myCarReservations: Array<Rate> = []

  constructor(private flightService: FlightService,private reservations: CarsServiceService, private router: Router)
  {
     
  }

  ngOnInit(): void {
    var decode = jwt_decode(localStorage.getItem('token'));
    var UserID = decode['UserID'];

    this.reservations.getReservations(UserID).subscribe(
      (res: any) => { 
        this.myCarReservations = res as Rate[]
        console.log(this.myCarReservations);
      },
      err => {
        console.log(err);
      }
    );


    this.flightService.getFlightReservationsForUser(UserID).subscribe(
      (res:MyFlightReservation[])=>{
        this.myReservations = res;
        console.log(this.myReservations);
      },
      err=>
      {
        console.log((err as HttpErrorResponse).message);
      }
    )
  }

  flightClicked(){
    this.bookFlight = !this.bookFlight;
    if(!this.aircompany)
      this.aircompany = !this.aircompany;
    if(!this.rentCar)
      this.rentCar = !this.rentCar;
    if(!this.carcompany)
      this.carcompany = !this.carcompany;
    if(!this.flightReservations)
      this.flightReservations = !this.flightReservations;
      if(!this.carReservations)
    this.carReservations = !this.carReservations;
  }

  carReservationClicked(){
    this.carReservations = !this.carReservations;
    if(!this.aircompany)
      this.aircompany = !this.aircompany;
    if(!this.rentCar)
      this.rentCar = !this.rentCar;
    if(!this.carcompany)
      this.carcompany = !this.carcompany;
    if(!this.flightReservations)
      this.flightReservations = !this.flightReservations;
    if(!this.bookFlight)
      this.bookFlight = !this.bookFlight;
  }

  aircompanyClicked(){
    this.aircompany = !this.aircompany;
    if(!this.bookFlight)
      this.bookFlight= !this.bookFlight;
    if(!this.rentCar)
      this.rentCar = !this.rentCar;
    if(!this.carcompany)
      this.carcompany = !this.carcompany;
    if(!this.flightReservations)
      this.flightReservations = !this.flightReservations;
      if(!this.carReservations)
    this.carReservations = !this.carReservations;
  }

  carClicked(){
    this.rentCar = !this.rentCar;
    if(!this.carcompany)
      this.carcompany=!this.carcompany;
    if(!this.aircompany)
      this.aircompany = !this.aircompany;
    if(!this.bookFlight)
      this.bookFlight = !this.bookFlight;
    if(!this.flightReservations)
      this.flightReservations = !this.flightReservations;
      if(!this.carReservations)
    this.carReservations = !this.carReservations;
  }

  carcompanyClicked(){
    this.carcompany = !this.carcompany;
    if(!this.aircompany)
      this.aircompany=!this.aircompany;
    if(!this.rentCar)
      this.rentCar = !this.rentCar;
    if(!this.bookFlight)
      this.bookFlight=!this.bookFlight;
    if(!this.flightReservations)
      this.flightReservations = !this.flightReservations;
      if(!this.carReservations)
    this.carReservations = !this.carReservations;
  }

  flightReservationsClicked(){
    this.flightReservations = !this.flightReservations;
    if(!this.aircompany)
      this.aircompany=!this.aircompany;
    if(!this.rentCar)
      this.rentCar = !this.rentCar;
    if(!this.bookFlight)
      this.bookFlight=!this.bookFlight;
    if(!this.carcompany)
      this.carcompany = !this.carcompany;
    if(!this.carReservations)
    this.carReservations = !this.carReservations;

  }

  cancelFlight(id:number){
    
    this.reservations.cancelReservationWithFlight(id).subscribe(
      (res: any)=>{

      },
      err=>{
        console.log((err as HttpErrorResponse).message);
      }
    )

    this.flightService.cancelFlightReservation(id).subscribe(
      (res:any)=>{
        this.flightReservations = !this.flightReservations;
        window.location.reload();
      },
      err=>{
        alert("Some kind of error occurd on our servers, please try again later");
      }
    )
  }


  cancelCar(id: string){
    alert(id);
    this.reservations.cancelReservation(id).subscribe(
      (res:any)=>{

      },
      err=>
      {
        console.log((err as HttpErrorResponse).message);
      }
    )
  }

  logOut(){
    console.log("USAO");
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
}
