import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rent-a-car-admin',
  templateUrl: './rent-a-car-admin.component.html',
  styleUrls: ['./rent-a-car-admin.component.css']
})
export class RentACarAdminComponent implements OnInit {
  carcompany: boolean = true;
  cars: boolean = true;
  business: boolean = true;
  income: boolean = true;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  carcompanyClicked(){
    this.carcompany = !this.carcompany;
  }

  carsClicked(){
    this.cars = !this.cars;
  }

  businessClicked(){
    this.business = !this.business;
  }

  incomeClicked(){
    this.income = !this.income;
  }

  logOut(){
    console.log("USAO");
    localStorage.clear();
    this.router.navigateByUrl("/home");
  }
}
