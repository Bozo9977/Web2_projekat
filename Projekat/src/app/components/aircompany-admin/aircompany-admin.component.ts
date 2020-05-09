import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aircompany-admin',
  templateUrl: './aircompany-admin.component.html',
  styleUrls: ['./aircompany-admin.component.css']
})
export class AircompanyAdminComponent implements OnInit {
  destinationClicked: boolean = true;
  flightClicked: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }
  
  newDestinationClicked(){
    this.destinationClicked = !this.destinationClicked;
    if(!this.flightClicked)
      this.flightClicked = !this.flightClicked;
  }

  newFlightClicked(){
    this.flightClicked = !this.flightClicked;
    if(!this.destinationClicked)
      this.destinationClicked = !this.destinationClicked;
  }
}
