import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FlightService } from 'src/app/services/flight-service/flight.service';
import { Rate } from 'src/app/entities/rate/rate';

@Component({
  selector: 'app-rate-flight',
  templateUrl: './rate-flight.component.html',
  styleUrls: ['./rate-flight.component.css']
})
export class RateFlightComponent implements OnInit {

  reservationList: Array<Rate>
  user;
  idUser: string;
  constructor(private route: ActivatedRoute, private reservations: FlightService, private routerPrim: Router) { }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userDetails'));
    this.idUser = this.user.id;
    this.loadReservations();
  }

  private loadReservations(){
    console.log(this.idUser);
    this.reservations.getReservations(this.idUser).subscribe(
      (res: any) => { 
        this.reservationList = res as Rate[]
        console.log(this.reservationList);
      },
      err => {
        console.log(err);
      }
    );
  } 

}
