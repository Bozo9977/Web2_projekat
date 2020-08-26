import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rent-a-car-admin',
  templateUrl: './rent-a-car-admin.component.html',
  styleUrls: ['./rent-a-car-admin.component.css']
})
export class RentACarAdminComponent implements OnInit {
  carcompany: boolean = true;
  cars: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }


  carcompanyClicked(){
    this.carcompany = !this.carcompany;
  }

  carsClicked(){
    this.cars = !this.cars;
  }
}
