import { Component, OnInit } from '@angular/core';
import { Flight, FlightReceive } from 'src/app/entities/flight/flight';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { Destination } from 'src/app/entities/destination/destination';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { ActivatedRoute } from '@angular/router';
import { SearchCar } from 'src/app/entities/searchCar/search-car';

@Component({
  selector: 'app-flights-view',
  templateUrl: './flights-view.component.html',
  styleUrls: ['./flights-view.component.css']
})
export class FlightsViewComponent implements OnInit {
  flights: Array<FlightReceive>
  idCompany: number;
  availableFlightForm: FormGroup
  submitted = false;
  searchFlight: SearchCar;
  constructor(private flightService: FlightService,  private destinationService: DestinationServiceService, private route: ActivatedRoute) { 
    route.params.subscribe(params => { this.idCompany = params['id']; });
  }

  ngOnInit(): void {
    this.loadFlights();

    this.availableFlightForm = new FormGroup({
      'kategorija': new FormControl(null, [Validators.required]),
      'search': new FormControl(null, [Validators.required]),
    });
  }


  
 get f() { return this.availableFlightForm.controls; }
  

  private loadFlights(){

  
  this.flightService.getFlightsForCompany(this.idCompany).subscribe(
    (res: any)=>{
      console.log(res);
      this.flights = res as FlightReceive[];
    },
    err => {
      console.log(err);
    }
  );
}

onSearchAvailableFlight(){

  this.submitted = true;

  if (this.availableFlightForm.invalid) {
      return;
  }
  console.log(this.availableFlightForm.value);
  this.searchFlight = new SearchCar();
  this.searchFlight = this.availableFlightForm.value;
  this.searchFlight.IdComp = this.idCompany;
  console.log(this.searchFlight);
  this.flightService.searchFlightsFunction(this.searchFlight).subscribe(
    (res: any) => { 
      this.flights = res as FlightReceive[]
      console.log(this.flights);
     },
    err => {
      console.log(err);
    }
  );

  this.submitted = false;
  this.availableFlightForm.reset();
}

}
