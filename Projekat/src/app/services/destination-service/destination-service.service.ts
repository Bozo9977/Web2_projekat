import { Injectable } from '@angular/core';
import { Destination } from '../../entities/destination/destination';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationServiceService {

  constructor(private http: HttpClient) { }

  readonly BasURI = "https://localhost:44314/api";

  loadDestinations(){
    return this.mockedDestinations();
  }

  getDestinations(): Observable<Destination[]>{
    return this.http.get<Destination[]>(this.BasURI + '/Destination/GetDestinations');
  }

  addDestination(formData){
    return this.http.post(this.BasURI + '/Destination/AddDestination',formData);
  }

  deleteDestination(id: number): Observable<{}>{
    return this.http.delete(this.BasURI + '/Destination/DeleteDestination/'+id);
  }

  mockedDestinations(): Array<Destination>{
    let allDest = new Array<Destination>();

    const d1 = new Destination(1, 'Munich');
    const d2 = new Destination(2, 'Washington');
    const d3 = new Destination(3, 'Belgrade');
    const d4 = new Destination(40, 'London');
    const d5 = new Destination(400, 'Paris');

    allDest.push(d1);
    allDest.push(d2);
    allDest.push(d3);
    allDest.push(d4);
    allDest.push(d5);

    return allDest;
  }
}
