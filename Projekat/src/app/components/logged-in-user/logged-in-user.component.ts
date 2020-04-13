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
  }

  aircompanyClicked(){
    this.aircompany = !this.aircompany;
  }

  carClicked(){
    this.rentCar = !this.rentCar;
  }

  carcompanyClicked(){
    this.carcompany = !this.carcompany;
  }
}
