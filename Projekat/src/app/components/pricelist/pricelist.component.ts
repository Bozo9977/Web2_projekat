import { Component, OnInit } from '@angular/core';
import { Pricelist } from 'src/app/entities/pricelist/pricelist';
import { PricelistService } from 'src/app/services/pricelist-service/pricelist.service';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styleUrls: ['./pricelist.component.css']
})
export class PricelistComponent implements OnInit {

  pricelist: Array<Pricelist>;
  constructor(private price: PricelistService) { }

  ngOnInit(): void {
    this.pricelist = this.price.loadPricelist();
  }

}
