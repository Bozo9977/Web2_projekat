import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';
import { Rate } from 'src/app/entities/rate/rate';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  id: string;
  ratingSend: Rate;

  constructor(private route: ActivatedRoute, private rating: CarsServiceService, private routerPrim: Router) { 
    route.params.subscribe(params => { this.id = params['id']; });
  }

  ratingForm: FormGroup;

  ngOnInit(): void {
    this.ratingForm = new FormGroup({
      'serviceRating': new FormControl(''),
      'vehicleRating': new FormControl(''),
    });
  }

  onRating() {
    console.log(this.ratingForm.value);
    this.ratingSend = this.ratingForm.value; 
    this.ratingSend.id = this.id;
    console.log(this.ratingSend);
    this.rating.CreateRate(this.ratingSend).subscribe(
      (res: any) => {
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    );
    this.ratingForm.reset();
  }

}
