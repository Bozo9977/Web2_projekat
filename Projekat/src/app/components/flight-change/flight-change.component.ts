import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Destination } from 'src/app/entities/destination/destination';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { ActivatedRoute } from '@angular/router';
import { Flight } from 'src/app/entities/flight/flight';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-change',
  templateUrl: './flight-change.component.html',
  styleUrls: ['./flight-change.component.css']
})
export class FlightChangeComponent implements OnInit {

  flightForm: FormGroup;
  destinationsSelect: Array<Destination>;
  flightToChange: Flight;

  id: number;

  constructor(private destService: DestinationServiceService, private flightService: FlightService, private route: ActivatedRoute)
  {
    route.params.subscribe(params=>this.id = params['id']);
  }

  ngOnInit(): void {
    this.destService.getDestinations().subscribe(
      (res: any) => { 
        this.destinationsSelect = res as Destination[] 
      },
      err => {
        console.log(err);
      }
    );
    //alert(this.id);
    this.flightService.getFlight(this.id).subscribe(
      (res:any)=>{
        this.flightToChange = res as Flight;
        console.log(this.flightToChange);

        alert(this.flightToChange.id);  
        this.flightForm.controls['id'].setValue(this.flightToChange.id as number);
        this.flightForm.controls['arrival'].setValue(this.flightToChange.arrival);
        this.flightForm.controls['departure'].setValue(this.flightToChange.departure);
        this.flightForm.controls['length'].setValue(this.flightToChange.length);
        this.flightForm.controls['priceFirst'].setValue(this.flightToChange.priceFirst);
        this.flightForm.controls['priceEconomy'].setValue(this.flightToChange.priceEconomy);
        this.flightForm.controls['priceBusiness'].setValue(this.flightToChange.priceBusiness);
        this.flightForm.controls['numberBusiness'].setValue(this.flightToChange.numberBusiness);
        this.flightForm.controls['numberEconomy'].setValue(this.flightToChange.numberEconomy)
        this.flightForm.controls['numberFirst'].setValue(this.flightToChange.numberFirst)
        this.flightForm.controls['takeOff'].setValue(this.flightToChange.takeOff as DatePipe);
        this.flightForm.controls['touchDown'].setValue(this.flightToChange.touchDown);
        
        this.flightForm.controls['existingConnections'].setValue(this.flightToChange.connections);
      },
      err =>{
        alert(err);
      }
    );

    this.initForm();
  }

  private initForm(){
    this.flightForm = new FormGroup({
      'id': new FormControl(''),
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
      'numberEconomy': new FormControl('',[Validators.required]),
      'existingConnections': new FormControl('')
    });
  }

  submit(){
    if(this.flightForm.get('connections').value == ""){
      this.flightForm.patchValue({'connections': this.flightToChange.connections});
    }
    
    //var company = JSON.parse(localStorage.getItem('company'));
    let flightID: number = this.id as number;
    //this.flightForm.controls['Id'].setValue(flightID);

    console.log(this.flightForm.value);
    // let flight: Flight = this.flightForm.value;
    // console.log(flight);

    this.flightService.changeFlight(this.flightForm.value).subscribe(
      (res:any)=>{
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    )

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
