import { Injectable } from '@angular/core';
import { Pricelist } from 'src/app/entities/pricelist/pricelist';

@Injectable({
  providedIn: 'root'
})
export class PricelistService {

  constructor() { }


  loadPricelist(){
    return this.mockedPricelist();
  }


  mockedPricelist():Array<Pricelist>{
    let allComp = new Array<Pricelist>();

    const c1 = new Pricelist(1, 5544, 'Audi A4', 1200, 500);
    const c2 = new Pricelist(2, 5545, 'Bmw', 2000, 700);
    const c3 = new Pricelist(3, 5546, 'Megan', 1000, 400);

    allComp.push(c1);
    allComp.push(c2);
    allComp.push(c3);

    return allComp;
  }
}
