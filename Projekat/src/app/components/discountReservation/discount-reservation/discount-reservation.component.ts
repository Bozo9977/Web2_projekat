import { Component, OnInit } from '@angular/core';
import { DiscountReservation } from 'src/app/entities/discountReservation/discount-reservation';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DiscountUser } from 'src/app/entities/discountUser/discount-user';
import { User } from 'src/app/entities/user/user';

@Component({
  selector: 'app-discount-reservation',
  templateUrl: './discount-reservation.component.html',
  styleUrls: ['./discount-reservation.component.css']
})
export class DiscountReservationComponent implements OnInit {

  carsList:Array<DiscountReservation>
  id: string;
  reservationToSend: DiscountUser;
  user: User;
  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router) {
    route.params.subscribe(params => { this.id = params['id']; });
    this.user = JSON.parse(localStorage.getItem('userDetails'));
  }
  

  ngOnInit(): void {
    this.loadRezervation();
  }


  private loadRezervation()
  {
    console.log("USAAAAAO FRONT INCOME");
    console.log(this.id);
    this.cars.loadSaleReservation(this.id).subscribe(
      (res: any) => { 
        this.carsList = res as Array<DiscountReservation>;
        console.log("LISTA VRACENA", this.carsList);
      },
      err => {
        console.log(err);
      }
    );
  }

  newReservation(idRez: string)
  {

    this.reservationToSend = new DiscountUser(idRez, this.user.id);
    console.log("USER TO SEND", this.reservationToSend);
    this.cars.newFastReservationCar(this.reservationToSend).subscribe(
      
      (res: any) => { 
        console.log(res);
       },
      err => {
        console.log(err);
        alert("Car is already reserved!");
      }
    );

  }

}
