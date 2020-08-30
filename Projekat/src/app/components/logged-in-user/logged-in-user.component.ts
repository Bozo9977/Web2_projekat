import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { MyFlightReservation } from 'src/app/entities/my-flight-reservation/my-flight-reservation';
import * as jwt_decode from 'jwt-decode';
import { HttpErrorResponse } from '@angular/common/http';

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

  myReservations: MyFlightReservation[] = [];

  constructor(private flightService: FlightService)
  {
     
  }

  ngOnInit(): void {
    var decode = jwt_decode(localStorage.getItem('token'));
    var UserID = decode['UserID'];
    this.flightService.getFlightReservationsForUser(UserID).subscribe(
      (res:MyFlightReservation[])=>{
        this.myReservations = res;
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


  }

  cancelFlight(id:number){

  }

}
