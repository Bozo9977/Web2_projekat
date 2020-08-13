import { Component, OnInit } from '@angular/core';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
import { Aircompany } from 'src/app/entities/aircompany/aircompany';

@Component({
  selector: 'app-aircompany-admin',
  templateUrl: './aircompany-admin.component.html',
  styleUrls: ['./aircompany-admin.component.css']
})
export class AircompanyAdminComponent implements OnInit {
  destinationClicked: boolean = true;
  flightClicked: boolean = true;
  flightsClicked: boolean = true;
  company: Aircompany;
  constructor() { }

  ngOnInit(): void {
    this.company = JSON.parse(localStorage.getItem('company'));
    console.log(this.company.name);
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
