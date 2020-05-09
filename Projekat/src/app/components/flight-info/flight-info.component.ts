import { Component, OnInit, Input } from '@angular/core';
import { DlDateTimeCoreModule } from 'angular-bootstrap-datetimepicker';
import { DatePipe } from '@angular/common';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { Destination } from 'src/app/entities/destination/destination';
import { FormGroup, Validators, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Flight} from 'src/app/entities/flight/flight';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css']
})
export class FlightInfoComponent implements OnInit {
 
  flightForm: FormGroup;

  destinationsSelect: Array<Destination>;

  constructor(private destService: DestinationServiceService) { 
  }

  ngOnInit(): void {
    this.destinationsSelect = this.destService.loadDestinations();
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
      'price': new FormControl('',[Validators.required])
    });
  }
  submit(){
    let flight: Flight = this.flightForm.value;
    console.log(flight);
    this.resetForm(this.flightForm);
  }

  resetForm(form: FormGroup){
    form.reset();
  }

}
