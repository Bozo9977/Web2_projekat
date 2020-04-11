import { Component, OnInit} from '@angular/core';
import { Destination } from 'src/app/entities/destination/destination';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.css']
})
export class DestinationsComponent implements OnInit {
  
  destinations: Array<Destination>;

  
  constructor(private destService: DestinationServiceService) {
    this.destinations = this.destService.loadDestinations();
  }

  ngOnInit(): void {
  }

}
