import { Injectable } from '@angular/core';
import { Cars } from 'src/app/entities/cars/cars';

@Injectable({
  providedIn: 'root'
})
export class CarsServiceService {

  constructor() { }

  loadCars(){
    return this.mockedCars();
  }


  mockedCars():Array<Cars>{
    let allComp = new Array<Cars>();

    const c1 = new Cars("assets/images/audi.jpg" ,1, 5544, 'Audi A4', 2010, 'Disel', 'Manual', 5, 4, 'Yes', 2);
    const c2 = new Cars("assets/images/bmw.jpg" ,2, 5545, 'Bmw', 2015, 'Disel', 'Automatic', 5, 5, 'Yes', 4);
    const c3 = new Cars("assets/images/megan.jpg" ,3, 5546, 'Megan', 2012, 'Disel', 'Manual', 5, 5, 'Yes', 3);

    allComp.push(c1);
    allComp.push(c2);
    allComp.push(c3);

    return allComp;
  }


}
