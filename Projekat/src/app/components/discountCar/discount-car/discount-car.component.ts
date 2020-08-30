import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DiscountCar } from 'src/app/entities/discountCar/discount-car';

@Component({
  selector: 'app-discount-car',
  templateUrl: './discount-car.component.html',
  styleUrls: ['./discount-car.component.css']
})
export class DiscountCarComponent implements OnInit {

  discountCarForm: FormGroup;
  id: string;
  submitted = false;
  discountSend: DiscountCar;
  constructor(private route: ActivatedRoute, private cars: CarsServiceService, private routerPrim: Router) {
    route.params.subscribe(params => { this.id = params['id']; });
   }

  ngOnInit(): void {
    this.discountCarForm = new FormGroup({
      'startDay': new FormControl(null, [Validators.required]),
      'endDay': new FormControl(null, [Validators.required]),
      'procenat' : new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]),
    });
  }

  get f() { return this.discountCarForm.controls; }

  onCreateDiscount(){
    this.submitted = true;

    if (this.discountCarForm.invalid) {
        return;
    }

    this.discountSend = this.discountCarForm.value;
    this.discountSend.idCar = this.id;
    this.cars.addDiscountCar(this.discountSend).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
    this.submitted = false;
    this.discountCarForm.reset();

  }

}
