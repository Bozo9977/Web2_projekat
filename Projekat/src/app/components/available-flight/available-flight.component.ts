import { Component, OnInit } from '@angular/core';
import { Flight, FlightReceive } from 'src/app/entities/flight/flight';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { Destination } from 'src/app/entities/destination/destination';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { FlightQuickReservation } from 'src/app/entities/Flight-quick-reservations/flight-quick-reservation';

@Component({
  selector: 'app-available-flight',
  templateUrl: './available-flight.component.html',
  styleUrls: ['./available-flight.component.css']
})
export class AvailableFlightComponent implements OnInit {

  flights: Array<FlightReceive>
  admin: boolean = false;

  destinations: Destination[];
  searchAvailableFlightsForm: FormGroup;
  
  idCompany: number;

  quickReservations: Array<FlightQuickReservation> = new Array<FlightQuickReservation>();

  quickResClicked: boolean = true;

  constructor(private flightService: FlightService,  private destinationService: DestinationServiceService, private route: ActivatedRoute) 
  { 
    if(!this.admin)
      route.params.subscribe(params => { this.idCompany = params['id']; });
  }

  ngOnInit(): void {
    if(localStorage.getItem("userType")=="AirlineAdministrator")
      this.admin = true;

      this.searchAvailableFlightsForm = new FormGroup({
        'Departure': new FormControl('', Validators.nullValidator),
        'Arrival': new FormControl('',Validators.nullValidator),
        'startDay' : new FormControl('',Validators.nullValidator),
        'endDay': new FormControl('',Validators.nullValidator),
        'Type': new FormControl('',Validators.nullValidator),
        // 'Number': new FormControl('',Validators.nullValidator),
        'Aircompany': new FormControl('',Validators.nullValidator)
      });

      
      if(!this.admin){
       // alert(this.admin);
       
       //this.searchAvailableFlightsForm.patchValue({'idCompany':this.idCompany as number});

        this.destinationService.getDestinationsForCompany(this.idCompany).subscribe(
          (res:Destination[])=>{
            this.destinations = res;
          },
          err=>{
            console.log((err as HttpErrorResponse).message);
          }
        )
      }else{
        var company = JSON.parse(localStorage.getItem('company'));

        this.destinationService.getDestinationsForCompany(company.id).subscribe(
          (res:Destination[])=>{
            this.destinations = res;
          },
          err=>{
            console.log((err as HttpErrorResponse).message);
          }
        )

        this.flightService.getFlightsForCompany(company.id).subscribe(
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

  changeFlight(id: number){
    console.log(id);
  }

  searchAvailableFlights(){


    // var search: SearchFlight = this.searchAvailableFlightsForm.value;
    // search.idCompany = this.idCompany;

    // console.log(search);
    

    this.searchAvailableFlightsForm.patchValue({'Aircompany':this.idCompany});
    this.flightService.searchFlights(this.searchAvailableFlightsForm.value).subscribe(
      (res:any)=>
      {
        this.flights = res as FlightReceive[];
      },
      err=>{
        console.log((err as HttpErrorResponse).message);
      }
    )
  }


  showQuickReservations(id: number){
    this.quickResClicked = !this.quickResClicked;
    this.flightService.getQuickReservationsForFlight(id).subscribe(
      (res: any)=>{
        this.quickReservations = res;
        console.log(this.quickReservations);
      },
      err=>{
        console.log((err as HttpErrorResponse).message);
      }
    )
  }


  bookQuickRes(id:number){
    alert(id);
    this.flightService.bookQuickFlightRes(id).subscribe(
      (res:any)=>{

      },
      err=>{
        console.log((err as HttpErrorResponse).message);
      }
    )
  }

  deleteFlight(id:number){
    this.flightService.deleteFlight(id).subscribe(
      (res: any)=>{

      },
      err=>{
        console.log((err as HttpErrorResponse).message);

      }
    )
  }

}
