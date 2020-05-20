import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }
  readonly BasURI = "https://localhost:44314/api";
  addFlight(flight){
    return this.http.post(this.BasURI + '/Flights/AddFlight',flight);
  }
}
