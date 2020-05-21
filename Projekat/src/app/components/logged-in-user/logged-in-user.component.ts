import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  flightClicked(){
    this.bookFlight = !this.bookFlight;
    if(!this.aircompany)
      this.aircompany = !this.aircompany;
    if(!this.rentCar)
      this.rentCar = !this.rentCar;
    if(!this.carcompany)
      this.carcompany = !this.carcompany;
  }

  aircompanyClicked(){
    this.aircompany = !this.aircompany;
    if(!this.bookFlight)
      this.bookFlight= !this.bookFlight;
    if(!this.rentCar)
      this.rentCar = !this.rentCar;
    if(!this.carcompany)
      this.carcompany = !this.carcompany;
  }

  carClicked(){
    this.rentCar = !this.rentCar;
    if(!this.carcompany)
      this.carcompany=!this.carcompany;
    if(!this.aircompany)
      this.aircompany = !this.aircompany;
    if(!this.bookFlight)
      this.bookFlight = !this.bookFlight;
  }

  carcompanyClicked(){
    this.carcompany = !this.carcompany;
    if(!this.aircompany)
      this.aircompany=!this.aircompany;
    if(!this.rentCar)
      this.rentCar = !this.rentCar;
    if(!this.bookFlight)
      this.bookFlight=!this.bookFlight;
  }
}
