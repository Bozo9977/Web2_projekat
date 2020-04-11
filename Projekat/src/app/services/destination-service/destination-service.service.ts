import { Injectable } from '@angular/core';
import { Destination } from '../../entities/destination/destination';

@Injectable({
  providedIn: 'root'
})
export class DestinationServiceService {

  constructor() { }

  loadDestinations(){
    return this.mockedDestinations();
  }

  mockedDestinations(): Array<Destination>{
    let allDest = new Array<Destination>();

    const d1 = new Destination(1, 'Munich');
    const d2 = new Destination(2, 'Washington');
    const d3 = new Destination(3, 'Belgrade');
    const d4 = new Destination(4, 'London');

    allDest.push(d1);
    allDest.push(d2);
    allDest.push(d3);
    allDest.push(d4);

    return allDest;
  }
}
