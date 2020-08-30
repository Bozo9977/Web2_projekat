import { Component, OnInit } from '@angular/core';
import { Destination } from 'src/app/entities/destination/destination';
import { DestinationServiceService } from 'src/app/services/destination-service/destination-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-destination-view',
  templateUrl: './destination-view.component.html',
  styleUrls: ['./destination-view.component.css']
})
export class DestinationViewComponent implements OnInit {

  destinations: Array<Destination>;
  idCompany: number;

  constructor(private destService: DestinationServiceService, private route: ActivatedRoute) { 
    route.params.subscribe(params => { this.idCompany = params['id']; });
  }

  ngOnInit(): void {
    this.loadDests();
  }

  private loadDests(){

    this.destService.getDestinationsForCompany(this.idCompany).subscribe(
      (res: any) => { 
        this.destinations = res as Destination[] 
      },
      err => {
        console.log(err);
      }
    );

  
}

}
