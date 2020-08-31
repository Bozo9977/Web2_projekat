import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FlightService } from 'src/app/services/flight-service/flight.service';

@Component({
  selector: 'app-accept-flight-invitation',
  templateUrl: './accept-flight-invitation.component.html',
  styleUrls: ['./accept-flight-invitation.component.css']
})
export class AcceptFlightInvitationComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute, private flightService: FlightService, private router: Router) { }

  ngOnInit(): void {
    this.flightService.acceptFlightInvite(this.id).subscribe(
      (res: any)=>{
        this.router.navigateByUrl("/home");
      }
    )
  }

}
