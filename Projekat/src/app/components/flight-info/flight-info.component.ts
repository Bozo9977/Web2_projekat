import { Component, OnInit, Input } from '@angular/core';
import { DlDateTimeCoreModule } from 'angular-bootstrap-datetimepicker';
import { DatePipe } from '@angular/common';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { Destination } from 'src/app/entities/destination/destination';

@Component({
  selector: 'app-flight-info',
  templateUrl: './flight-info.component.html',
  styleUrls: ['./flight-info.component.css']
})
export class FlightInfoComponent implements OnInit {
 
  touchdown: DatePipe;
  takeoff: DatePipe;
  destinationsSelect: Array<Destination>;

  constructor(private destService: DestinationServiceService) { 
  }

  ngOnInit(): void {
    this.destinationsSelect = this.destService.loadDestinations();
  }

  printDest(){

  }

}
