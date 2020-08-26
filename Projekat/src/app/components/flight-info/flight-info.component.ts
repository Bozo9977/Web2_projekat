import { Component, OnInit, Input } from '@angular/core';
import { DlDateTimeCoreModule } from 'angular-bootstrap-datetimepicker';
import { DatePipe } from '@angular/common';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { Destination } from 'src/app/entities/destination/destination';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Flight} from 'src/app/entities/flight/flight';
import { FlightService } from 'src/app/services/flight-service/flight.service';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css']
})
export class FlightInfoComponent implements OnInit {
 
  flightForm: FormGroup;

  destinationsSelect: Array<Destination>;

  constructor(private destService: DestinationServiceService, private flightService: FlightService) { 
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
      'numberEconomy': new FormControl('',[Validators.required]),
      'Aircompany': new FormControl('')
    });
  }
  submit(){

    var company = JSON.parse(localStorage.getItem('company'));
    this.flightForm.patchValue({'Aircompany':company.id});
    console.log(this.flightForm.value);
    let flight: Flight = this.flightForm.value;
    console.log(flight);

    this.flightService.addFlight(this.flightForm.value).subscribe(
      (res: any) => {
        console.log(res);
        
      },
      err =>{
        console.log(err);
      }
    );

    this.flightForm.reset();
  }


}
