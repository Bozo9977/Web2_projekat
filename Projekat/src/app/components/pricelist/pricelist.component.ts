import { Component, OnInit } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';
import { CarsServiceService } from 'src/app/services/cars-service/cars-service.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  carsList: Array<Cars>;
  constructor(private price: CarsServiceService) { }

  ngOnInit(): void {
    this.carsList = this.price.loadCars();
  }

}
