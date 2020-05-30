import { Component, OnInit } from '@angular/core';
import { Flight, FlightReceive } from 'src/app/entities/flight/flight';
import { FlightService } from 'src/app/services/flight-service/flight.service';

@Component({
  selector: 'app-available-flight',
  templateUrl: './available-flight.component.html',
  styleUrls: ['./available-flight.component.css']
})
export class AvailableFlightComponent implements OnInit {

  flights: Array<FlightReceive>
  admin: boolean = false;
  
  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
    if(localStorage.getItem("userType")=="admin")
      this.admin = true;
    this.flightService.getFlights().subscribe(
      (res: any)=>{
        console.log(res);
        this.flights = res as FlightReceive[];
      },
      err => {
        console.log(err);
      }
    );
  }

  changeFlight(id: number){
    console.log(id);
  }

}
