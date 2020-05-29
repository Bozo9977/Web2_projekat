import { Component, OnInit } from '@angular/core';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { ActivatedRoute } from '@angular/router';
import { Destination } from 'src/app/entities/destination/destination';

@Component({
  selector: 'app-destination-view',
  templateUrl: './destination-view.component.html',
  styleUrls: ['./destination-view.component.css']
})
export class DestinationViewComponent implements OnInit {

  id: number;
  destinations: Destination[]

  constructor(private destService: DestinationServiceService, private route: ActivatedRoute) {
    route.params.subscribe(params => { this.id = params['id']; });
    
   }

  ngOnInit(): void {
    console.log(this.id);
    this.destService.getDestinationsForCompany(this.id).subscribe(
      (res: any) =>{
        console.log(res);
        this.destinations = res as Destination[];
      },
      err => {
        console.log(err);
      }
    )
  }

}
