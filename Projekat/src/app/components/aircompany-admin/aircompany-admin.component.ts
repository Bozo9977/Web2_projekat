import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aircompany-admin',
  templateUrl: './aircompany-admin.component.html',
  styleUrls: ['./aircompany-admin.component.css']
})
export class AircompanyAdminComponent implements OnInit {
  destinationClicked: boolean = true;
  flightClicked: boolean = true;
  flightsClicked: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  
  newDestinationClicked(){
    this.destinationClicked = !this.destinationClicked;
    if(!this.flightClicked)
      this.flightClicked = !this.flightClicked;
    if(!this.flightsClicked)
    this.flightsClicked = !this.flightsClicked;
  }

  newFlightClicked(){
    this.flightClicked = !this.flightClicked;
    if(!this.destinationClicked)
      this.destinationClicked = !this.destinationClicked;
    if(!this.flightsClicked)
      this.flightsClicked = !this.flightsClicked;
  }
  getAllFlights(){
    this.flightsClicked = !this.flightsClicked;
    localStorage.setItem("userType", "admin");
    if(!this.destinationClicked)
      this.destinationClicked = !this.destinationClicked;
    if(!this.flightClicked)
      this.flightClicked = !this.flightClicked;
  }
}
