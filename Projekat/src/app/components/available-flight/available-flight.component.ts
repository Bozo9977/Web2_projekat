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

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
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

}
