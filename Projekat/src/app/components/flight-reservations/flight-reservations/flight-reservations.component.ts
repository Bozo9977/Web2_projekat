import { Component, OnInit } from '@angular/core';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { FlightReceive } from 'src/app/entities/flight/flight';
import { FlightSeat, Class } from 'src/app/entities/flight-seats/flight-seat';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-flight-reservations',
  templateUrl: './flight-reservations.component.html',
  styleUrls: ['./flight-reservations.component.css']
})
export class FlightReservationsComponent implements OnInit {

  flights: FlightReceive[];
  

  firstClass: FlightSeat[] = [];
  businessClass: Array<FlightSeat> = new Array<FlightSeat>();
  economyClass: Array<FlightSeat> = new Array<FlightSeat>();

  id: number;
  
  constructor(private flightService: FlightService, private route: ActivatedRoute)
  {
    route.params.subscribe(params => { this.id = params['id']; });


    // console.log(this.seats);
    // this.firstClass = this.getFirstClass(this.seats);
    //   console.log(this.firstClass);
  }

  ngOnInit(): void {

    


    this.flightService.getFirstClassSeatsForFlight(this.id).subscribe(
      (res: FlightSeat[])=>{
        this.firstClass = res;
      },
      err=>{
        alert((err as HttpErrorResponse).message);
      }
    )

    this.flightService.getBusinessClassSeatsForFlight(this.id).subscribe(
      (res: FlightSeat[])=>{
        this.businessClass = res;
      },
      err=>{
        alert((err as HttpErrorResponse).message)
      }
    )

    this.flightService.getEconomyClassSeatsForFlight(this.id).subscribe(
      (res: FlightSeat[])=>{
        this.economyClass = res;
      },
      err=>{
        alert((err as HttpErrorResponse).message);
      }
    )

  }

  
  
  checkSeat(id:number){
    alert("Uncheck seat:" + id)
  }
  
}
