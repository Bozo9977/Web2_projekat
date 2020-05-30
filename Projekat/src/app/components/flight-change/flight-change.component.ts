import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Destination } from 'src/app/entities/destination/destination';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { FlightService } from 'src/app/services/flight-service/flight.service';

@Component({
  selector: 'app-flight-change',
  templateUrl: './flight-change.component.html',
  styleUrls: ['./flight-change.component.css']
})
export class FlightChangeComponent implements OnInit {

  flightForm: FormGroup;
  destinationsSelect: Array<Destination>;

  constructor(private destService: DestinationServiceService, private flightService: FlightService) { }

  ngOnInit(): void {
    this.destService.getDestinations().subscribe(
      (res: any) => { 
        this.destinationsSelect = res as Destination[] 
      },
      err => {
        console.log(err);
      }
    );
    this.initForm();
  }

  private initForm(){
    this.flightForm = new FormGroup({
      'departure': new FormControl(null, [Validators.required]) ,
      'arrival':new FormControl(null, [Validators.required]),
      'takeOff': new FormControl(null,[Validators.required]),
      'touchDown': new FormControl(null, [Validators.required]),
      'length': new FormControl('', [Validators.required]),
      'connections': new FormControl(''),
      'priceFirst': new FormControl('',[Validators.required]),
      'numberFirst': new FormControl('',[Validators.required]),
      'priceBusiness': new FormControl('',[Validators.required]),
      'numberBusiness':new FormControl('',[Validators.required]),
      'priceEconomy': new FormControl('',[Validators.required]),
      'numberEconomy': new FormControl('',[Validators.required])
    });
  }

  submit(){
    // let flight: Flight = this.flightForm.value;
    // console.log(flight);

    // this.flightService.addFlight(this.flightForm.value).subscribe(
    //   (res: any) => {
    //     console.log(res);
        
    //   },
    //   err =>{
    //     console.log(err);
    //   }
    // );

    // this.flightForm.reset();
  }


}
