import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Rate } from 'src/app/entities/rate/rate';

@Component({
  selector: 'app-rate-acar',
  templateUrl: './rate-acar.component.html',
  styleUrls: ['./rate-acar.component.css']
})
export class RateACarComponent implements OnInit {

  constructor(private route: ActivatedRoute, private reservations: CarsServiceService, private routerPrim: Router) { 

  }

  reservationList: Array<Rate>
  user;
  idUser: string;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userDetails'));
    this.idUser = this.user.id;
    this.loadReservations();
  }

  private loadReservations(){
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
